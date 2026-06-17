export default function FAQCard({
  faq,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h3 className="font-bold text-lg">
        {faq.question}
      </h3>

      <p className="text-gray-600 mt-2">
        {faq.answer}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(faq)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(faq)}
          className="px-4 py-2 rounded-lg bg-red-500 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}