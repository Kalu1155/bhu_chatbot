export default function QuestionModal({
  show,
  question,
  onClose,
}) {
  if (!show || !question) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg md:text-xl font-bold">
            Question Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">

          {/* Question */}
          <div>
            <h3 className="font-semibold text-gray-700">
              Question
            </h3>
            <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
              {question.user_question}
            </p>
          </div>

          {/* Answer */}
          <div>
            <h3 className="font-semibold text-gray-700">
              AI Answer
            </h3>
            <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
              {question.bot_answer || "No answer yet"}
            </p>
          </div>

          {/* status */}
          <div>
            <h3 className="font-semibold text-gray-700">
              Status
            </h3>

            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                question.source === "faq"
                  ? "bg-green-100 text-green-700"
                  : question.source === "ai"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {question.status}
            </span>
          </div>
           {/* Source */}
          <div>
            <h3 className="font-semibold text-gray-700">
              Source
            </h3>

            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                question.source === "faq"
                  ? "bg-green-100 text-green-700"
                  : question.source === "ai"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {question.source}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}