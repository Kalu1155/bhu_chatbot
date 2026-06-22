import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/dashboard/StateCard";
import { useEffect, useState } from "react";
import SkeletonCard from "../components/dashboard/SkeletonCard";
import gsap from "gsap";
import { useRef } from "react";


import {
  getTotalFAQs,
  getTodayFAQs,
  getTotalQuestions,
  getUnansweredQuestions,
} from "../services/dashboardService";

export default function Dashboard() {
  const cardsRef = useRef([]);

 const [stats, setStats] = useState({
  totalFAQs: 0,
  todayFAQs: 0,
  totalQuestions: 0,
  unansweredQuestions: 0,
});
const [loading, setLoading] = useState(true);

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
    ] = await Promise.all([
      getTotalFAQs(),
      getTodayFAQs(),
      getTotalQuestions(),
      getUnansweredQuestions(),
    ]);

    setStats({
      totalFAQs,
      todayFAQs,
      totalQuestions,
      unansweredQuestions,
    });
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
  <StatCard
    title="Total FAQs"
    value={stats.totalFAQs}
  />
</div>

<div ref={(el) => (cardsRef.current[1] = el)}>
  <StatCard
    title="FAQs Today"
    value={stats.todayFAQs}
  />
</div>

<div ref={(el) => (cardsRef.current[2] = el)}>
  <StatCard
    title="Questions Asked"
    value={stats.totalQuestions}
  />
</div>

<div ref={(el) => (cardsRef.current[3] = el)}>
  <StatCard
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

        <p className="text-gray-500">
          We will connect real recent FAQs next.
        </p>
      </div>
    </AdminLayout>
  );
}