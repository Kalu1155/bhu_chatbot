import { supabase } from "../lib/supabase";

export const getFAQs = async () => {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
};

export const addFAQ = async (
  question,
  answer
) => {
  const { data, error } =
    await supabase
      .from("faqs")
      .insert([
        {
          question,
          answer,
        },
      ]);

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};

export const deleteFAQ = async (
  id
) => {
  const { error } =
    await supabase
      .from("faqs")
      .delete()
      .eq("id", id);

  if (error) throw error;
};

export const updateFAQ = async (
  id,
  question,
  answer
) => {
  const { data, error } =
    await supabase
      .from("faqs")
      .update({
        question,
        answer,
      })
      .eq("id", id)
      .select();

  if (error) throw error;

  return data;
};