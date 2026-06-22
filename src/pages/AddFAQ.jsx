// import { useEffect, useState } from "react";
// import {addFAQ} from "../services/faqService";
// export default function AddFAQ() {
//   const [question, setQuestion] =
//   useState("");

// const [answer, setAnswer] =
//   useState("");
//   const handleAddFAQ =
//   async () => {
//     if (
//       !question ||
//       !answer
//     )
//       return;

//     await addFAQ(
//       question,
//       answer
//     );

//     setQuestion("");
//     setAnswer("");

//     loadFAQs();
//   };
//   return (
//     <>
//       <div className="bg-white p-6 rounded-xl mb-6">
//   <input
//     type="text"
//     placeholder="Question"
//     value={question}
//     onChange={(e) =>
//       setQuestion(e.target.value)
//     }
//     className="w-full border p-3 rounded-lg mb-3"
//   />

//   <textarea
//     placeholder="Answer"
//     value={answer}
//     onChange={(e) =>
//       setAnswer(e.target.value)
//     }
//     className="w-full border p-3 rounded-lg mb-3"
//   />

//   <button
//     onClick={handleAddFAQ}
//     className="bg-black text-white px-5 py-3 rounded-lg"
//   >
//     Add FAQ
//   </button>
// </div>
//     </>
//   );
// }