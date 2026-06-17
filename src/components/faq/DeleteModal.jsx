export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="text-xl font-bold">
          Delete FAQ
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete this FAQ?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}