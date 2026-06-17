import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getAIResponse = async (question) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful school assistant. Answer in a friendly, simple and slightly youthful tone.",
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  return completion.choices[0].message.content;
};