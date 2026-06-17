import { useState, useEffect, useRef } from "react";
import {
  findFAQAnswer,
  saveUnansweredQuestion,
  saveChatHistory,
} from "../services/chatService";
import { getAIResponse } from "../services/aiService";


const formatAnswer = (answer) => {
  const templates = [
    `📢 School Update\n\n${answer}`,

    `👍 Thanks for asking.\n\n${answer}`,

    `📚 According to our records:\n\n${answer}`,

    `🎓 Here's the information you need:\n\n${answer}`,

    `✨ BHU Assistant found this:\n\n${answer}`,
  ];

  return templates[
    Math.floor(
      Math.random() *
      templates.length
    )
  ];
};

export default function StudentChat() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

// text: formatAnswer(answer)
  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text: "Hello 👋 How can I help you today?",
      },
    ]);

const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = message;

  setMessages((prev) => [
    ...prev,
    { sender: "user", text: userMessage },
  ]);

  setMessage("");

  try {
    setIsTyping(true);

    const thinkingTime = Math.min(
      1000 + userMessage.length * 40,
      3000
    );

    await new Promise((res) =>
      setTimeout(res, thinkingTime)
    );

//     const answer =
//       await findFAQAnswer(userMessage);

//    if (answer) {
//   await saveChatHistory(userMessage, answer.answer, "faq");

//   setMessages((prev) => [
//     ...prev,
//     {
//       sender: "bot",
//       text: formatAnswer(answer.answer),
//     },
//   ]);
// } else {
//   await saveUnansweredQuestion(userMessage);

//   await saveChatHistory(userMessage, "No answer found", "unanswered");

//   setMessages((prev) => [
//     ...prev,
//     {
//       sender: "bot",
//       text:
//         "I couldn’t find that in our system. The admin has been notified 📡",
//     },
//   ]);
// }
const answer =
  await findFAQAnswer(userMessage);

if (answer) {
  await saveChatHistory(
    userMessage,
    answer.answer,
    "faq"
  );

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: formatAnswer(answer.answer),
    },
  ]);
} else {
  const aiAnswer =
    await getAIResponse(userMessage);

  await saveUnansweredQuestion(
    userMessage
  );

  await saveChatHistory(
    userMessage,
    aiAnswer,
    "ai"
  );

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: aiAnswer,
    },
  ]);
}
  } catch (error) {
    console.log(error);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text:
          "Something went wrong. Please try again.",
      },
    ]);
  } finally {
    setIsTyping(false);
  }
};
// scrool down
useEffect(() => {
  setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
}, [messages, isTyping]);

  return (
    <div className="h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4">
        <h1 className="text-xl font-bold">
          BHU Assistant
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === "user"
                ? "justify-end"
                : "justify-start"
              }`}
          >
            <div
              className={`px-4 py-3 rounded-xl max-w-[80%] whitespace-pre-wrap${msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      {isTyping && (
  <div className="mb-4 flex justify-start">
    <div className="bg-white shadow px-4 py-3 rounded-xl">
      <p className="text-xs text-gray-500 mb-2">
        BHU Assistant is thinking...
      </p>

      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  </div>
)}
<div ref={messagesEndRef}></div>
      </div>
      {/* Input */}
      <div className="bg-white p-4 border-t flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask a question..."
          className="flex-1 border rounded-lg px-4 py-3"
        />

        <button
          onClick={handleSend}
          disabled={isTyping}
          className="bg-blue-600 text-white px-6 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}