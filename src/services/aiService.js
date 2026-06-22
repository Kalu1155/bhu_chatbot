import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getAIResponse = async (
  studentQuestion,
  faqQuestion,
  faqAnswer
) => {
  try {
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are BHU Assistant.

You are NOT allowed to invent school information.

Your job is ONLY to rewrite the school's official answer into a friendly, professional and helpful response.

Use the FAQ answer as the source of truth.
`,
          },

          {
            role: "user",
            content: `
Student asked:

${studentQuestion}

Matched FAQ:

${faqQuestion}

Official Answer:

${faqAnswer}

Rewrite the answer naturally and professionally.
`,
          },
        ],
      });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);

    return faqAnswer;
  }
};