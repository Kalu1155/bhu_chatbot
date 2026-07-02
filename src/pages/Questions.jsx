import AdminLayout from "../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { getQuestions } from "../services/faqService";
import QuestionModal from "../components/QuestionModal";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const data =
  //         await getQuestions();

  //       console.log(
  //         "Questions:",
  //         data
  //       );

  //       setQuestions(data || []);
  //     } catch (error) {
  //       console.error(
  //         "Failed to load questions:",
  //         error
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchQuestions();
  // }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();

        console.log("Questions from Supabase:", data);

        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);
  const filteredQuestions = questions.filter((q) =>
    q.user_question
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            Questions Management
          </h1>

          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-2 w-full md:w-80"
          />
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            Loading questions...
          </div>
        ) : filteredQuestions.length ===
          0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            No questions found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">
                    Question
                  </th>

                  <th className="text-left p-4">
                    Answer
                  </th>

                  <th className="text-left p-4">
                    Source
                  </th>
                   <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredQuestions.map(
                  (q) => (
                    <tr
                      key={q.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 max-w-sm">
                        {q.user_question}
                      </td>

                      <td className="p-4 max-w-md truncate">
                        {q.bot_answer}
                      </td>
 <td className="p-4 max-w-md truncate">
                        {q.source}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${q.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                            }`}
                        >
                          {q.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => {
                            setSelectedQuestion(
                              q
                            );
                            setShowModal(
                              true
                            );
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        <QuestionModal
          show={showModal}
          question={selectedQuestion}
          onClose={() =>
            setShowModal(false)
          }
        />
      </div>
    </AdminLayout>
  );
}