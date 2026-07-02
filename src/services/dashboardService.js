import { supabase } from "../lib/supabase";

/* =========================
   HELPERS (reusable logic)
========================= */

const getCount = async (table, filter = null) => {
  let query = supabase.from(table).select("*", {
    count: "exact",
    head: true,
  });

  if (filter) {
    query = filter(query);
  }

  const { count, error } = await query;

  if (error) throw error;
  return count || 0;
};

/* =========================
   FAQ STATS
========================= */

export const getTotalFAQs = async () => {
  return await getCount("faqs");
};

export const getTodayFAQs = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("faqs")
    .select("id")
    .gte("created_at", today.toISOString());

  if (error) throw error;

  return data?.length || 0;
};

/* =========================
   CHAT STATS
========================= */

export const getTotalQuestions = async () => {
  return await getCount("chat_history");
};

export const getUnansweredQuestions = async () => {
  const { count, error } = await supabase
    .from("chat_history")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("source", "unanswered");

  if (error) throw error;
  return count || 0;
};