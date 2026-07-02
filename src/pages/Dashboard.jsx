import AdminLayout from "../layouts/AdminLayout";
import StateCard from "../components/dashboard/StateCard";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/dashboard/SkeletonCard";
import gsap from "gsap";
import { useRef } from "react";
import { getRecentFAQs,}  from "../services/faqService";
import {
  getTotalFAQs,
  getTodayFAQs,
  getTotalQuestions,
  getUnansweredQuestions,
} from "../services/dashboardService";

export default function Dashboard() {
  const cardsRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [recentFAQs, setRecentFAQs] = useState([]);
 const [stats, setStats] = useState({
  totalFAQs: 0,
  todayFAQs: 0,
  totalQuestions: 0,
  unansweredQuestions: 0,
});

useEffect(() => {
  if (!loading) {
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.6,
    });
  }
}, [loading]);

const loadStats = async () => {
  try {
    setLoading(true);

    const [
      totalFAQs,
      todayFAQs,
      totalQuestions,
      unansweredQuestions,
      recentFAQs,
    ] = await Promise.all([
      getTotalFAQs(),
      getTodayFAQs(),
      getTotalQuestions(),
      getUnansweredQuestions(),
      getRecentFAQs(),
    ]);

    setStats({
      totalFAQs,
      todayFAQs,
      totalQuestions,
      unansweredQuestions,
    });

    setRecentFAQs(recentFAQs);
  } catch (error) {
    console.error(
      "Failed to load dashboard:",
      error
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadStats();
  }, []);
 


  return (
    <AdminLayout>
      {/* STATS */}
    <div className="grid md:grid-cols-4 gap-6">
      {
  loading ? (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  ) : (
    <>
     <div ref={(el) => (cardsRef.current[0] = el)}>
  <StateCard
    title="Total FAQs"
    value={stats.totalFAQs}
  />
</div>

<div ref={(el) => (cardsRef.current[1] = el)}>
  <StateCard
    title="FAQs Today"
    value={stats.todayFAQs}
  />
</div>

<div ref={(el) => (cardsRef.current[2] = el)}>
  <StateCard
    title="Questions Asked"
    value={stats.totalQuestions}
  />
</div>

<div ref={(el) => (cardsRef.current[3] = el)}>
  <StateCard
    title="Unanswered"
    value={stats.unansweredQuestions}
  />
</div>
    </>
  )
}

</div>

      {/* RECENT */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">
          Recent FAQs
        </h2>

       <div className="space-y-3">
  {recentFAQs.length === 0 ? (
    <p className="text-gray-500">
      No FAQs found.
    </p>
  ) : (
    recentFAQs.map((faq) => (
     <div
  key={faq.id}
  className="bg-gray-100 hover:bg-gray-200 transition rounded-xl p-4"
>
  <div className="flex justify-between items-start">
    <h3 className="font-semibold">
      {faq.question}
    </h3>

    <span className="text-xs text-gray-500">
      {new Date(
        faq.created_at
      ).toLocaleDateString()}
    </span>
  </div>

  <p className="text-gray-600 mt-2 line-clamp-2">
    {faq.answer}
  </p>
</div>
    ))
  )}
</div>
      </div>
    </AdminLayout>
  );
}