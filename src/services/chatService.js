import { supabase } from "../lib/supabase";
import Fuse from "fuse.js";

export const findFAQAnswer = async (
  question
) => {
  const { data, error } =
    await supabase
      .from("faqs")
      .select("*");

  if (error) throw error;

  const fuse = new Fuse(data, {
    keys: ["question"],
    threshold: 0.4,
    includeScore: true,
  });

  const results =
    fuse.search(question);

  if (results.length === 0)
    return null;

  return results[0].item;
};

// export const saveUnansweredQuestion =
//   async (question) => {
//     const { error } =
//       await supabase
//         .from(
//           "unanswered_questions"
//         )
//         .insert([{ question }]);

//     if (error) throw error;
//   };

export const saveChatHistory =
  async (
    question,
    answer,
    source
  ) => {
    const { error } =
      await supabase
        .from("chat_history")
        .insert([
          {
            user_question: question,
            bot_answer: answer,
            source,
          },
        ]);

    if (error) throw error;
  };