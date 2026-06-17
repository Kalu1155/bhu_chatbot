import { useEffect, useState } from "react";

export default function FAQModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

 const handleSubmit = () => {
  console.log("SAVE CLICKED");

  console.log(question);
  console.log(answer);

  if (!question || !answer) {
    console.log("EMPTY FIELD");
    return;
  }

  onSubmit({
    question,
    answer,
  });
};

  const handleClose = () => {
    setQuestion("");
    setAnswer("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit FAQ" : "Add FAQ"}
        </h2>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          className="w-full border p-3 rounded-lg"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}