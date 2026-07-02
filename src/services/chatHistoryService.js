import { supabase } from "../lib/supabase";

/* =========================
   CHAT HISTORY
========================= */

export const getChatHistory = async () => {
  const { data, error } = await supabase
    .from("chat_history")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

/* Alias (optional but useful for admin pages) */
export const getQuestions = async () => {
  const { data, error } = await supabase
    .from("chat_history")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};