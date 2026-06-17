import FAQCard from "./FAQCard";

export default function FAQList({
  faqs,
  onAdd,
  onEdit,
  onDelete,
}) {
  const safeFaqs = Array.isArray(faqs) ? faqs : [];

  return (
    <>
      <button
        onClick={onAdd}
        className="bg-black text-white px-5 py-3 rounded-lg mb-5"
      >
        Add FAQ
      </button>

      <div className="space-y-4">
        {safeFaqs.length === 0 ? (
          <p className="text-gray-500">No FAQs yet</p>
        ) : (
          safeFaqs.map((faq) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </>
  );
}