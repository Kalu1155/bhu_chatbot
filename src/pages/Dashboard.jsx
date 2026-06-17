import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/dashboard/StateCard";
import { useEffect, useState } from "react";

import {
  getTotalFAQs,
  getTodayFAQs,
  getTotalQuestions,
  getUnansweredQuestions,
} from "../services/dashboardService";

export default function Dashboard() {
 const [stats, setStats] = useState({
  totalFAQs: 0,
  todayFAQs: 0,
  totalQuestions: 0,
  unansweredQuestions: 0,
});

const loadStats = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    loadStats();
  }, []);
  return (
    <AdminLayout>
      {/* STATS */}
    <div className="grid md:grid-cols-4 gap-6">
  <StatCard
    title="Total FAQs"
    value={stats.totalFAQs}
  />

  <StatCard
    title="FAQs Today"
    value={stats.todayFAQs}
  />

  <StatCard
    title="Questions Asked"
    value={stats.totalQuestions}
  />

  <StatCard
    title="Unanswered"
    value={stats.unansweredQuestions}
  />
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