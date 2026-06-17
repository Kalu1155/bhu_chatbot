import { supabase } from "../lib/supabase";

// TOTAL FAQS
export const getTotalFAQs = async () => {
  const { count, error } = await supabase
    .from("faqs")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count || 0;
};

// FAQS CREATED TODAY
export const getTodayFAQs = async () => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .gte(
      "created_at",
      today.toISOString()
    );

  if (error) throw error;

  return data?.length || 0;
};

// TOTAL QUESTIONS ASKED
export const getTotalQuestions =
  async () => {
    const { count, error } =
      await supabase
        .from("chat_history")
        .select("*", {
          count: "exact",
          head: true,
        });

    if (error) throw error;

    return count || 0;
  };

// UNANSWERED QUESTIONS
export const getUnansweredQuestions =
  async () => {
    const { count, error } =
      await supabase
        .from("chat_history")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "source",
          "unanswered"
        );

    if (error) throw error;

    return count || 0;
  };