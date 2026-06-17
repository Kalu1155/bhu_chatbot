import { useEffect, useState } from "react";
import { getFAQs, addFAQ, updateFAQ, deleteFAQ } from "../services/faqService";

import AdminLayout from "../layouts/AdminLayout";
import FAQList from "../components/faq/FAQList";
import FAQModal from "../components/faq/FAQModal";
import DeleteModal from "../components/faq/DeleteModal";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedFAQ, setSelectedFAQ] = useState(null);

  // LOAD FAQS
const loadFAQs = async () => {
  try {
    const data = await getFAQs();
    setFaqs(Array.isArray(data) ? data : []);
  } catch (error) {
    console.log(error);
    setFaqs([]);
  }
};
console.log("FAQS DATA:", faqs);
  useEffect(() => {
    loadFAQs();
  }, []);

  // OPEN ADD
  const handleAddClick = () => {
    setSelectedFAQ(null);
    setIsModalOpen(true);
  };

  // OPEN EDIT
  const handleEditClick = (faq) => {
    setSelectedFAQ(faq);
    setIsModalOpen(true);
  };

  // OPEN DELETE
  const handleDeleteClick = (faq) => {
    setSelectedFAQ(faq);
    setIsDeleteOpen(true);
  };

  // ADD + UPDATE
  const handleSubmitFAQ = async (formData) => {
    if (selectedFAQ) {
      await updateFAQ(selectedFAQ.id, formData.question, formData.answer);
    } else {
      await addFAQ(formData.question, formData.answer);
    }

    setIsModalOpen(false);
    setSelectedFAQ(null);
    loadFAQs();
  };

 
  // Delete
  const handleDeleteConfirm = async () => {
    await deleteFAQ(selectedFAQ.id);

    setIsDeleteOpen(false);
    setSelectedFAQ(null);
    loadFAQs();
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">FAQs</h1>

        <FAQList
          faqs={faqs}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      <FAQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedFAQ}
        onSubmit={handleSubmitFAQ}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </AdminLayout>
  );
}