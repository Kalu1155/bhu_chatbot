import { supabase } from "../lib/supabase";

export const getChatHistory = async () => {
  const { data, error } =
    await supabase
      .from("chat_history")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return data;
};