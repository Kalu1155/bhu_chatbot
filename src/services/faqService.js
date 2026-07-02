import { supabase } from "../lib/supabase";

/* =========================
   FAQS
========================= */

export const getFAQs = async () => {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const addFAQ = async (question, answer) => {
  const { data, error } = await supabase
    .from("faqs")
    .insert([{ question, answer }])
    .select();

  if (error) throw error;
  return data?.[0];
};

export const updateFAQ = async (id, question, answer) => {
  const { data, error } = await supabase
    .from("faqs")
    .update({ question, answer })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data?.[0];
};

export const deleteFAQ = async (id) => {
  const { error } = await supabase
    .from("faqs")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export const getRecentFAQs = async (limit = 5) => {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) throw error;

  return data || [];
};

/* =========================
   QUESTIONS 
========================= */

export const getQuestions = async () => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const addQuestion = async (
  user_question,
  bot_answer = null,
  source = "ai",
  status = "pending"
) => {
  const { data, error } = await supabase
    .from("questions")
    .insert([
      {
        user_question,
        bot_answer,
        source,
        status,
      },
    ])
    .select();

  if (error) throw error;
  return data?.[0];
};