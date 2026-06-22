import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({
  children,
}) {
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const [{ data }] = await Promise.all([
        supabase.auth.getUser(),
        new Promise((resolve) =>
          setTimeout(resolve, 1200)
        ),
      ]);

      setUser(data.user);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="h-dvh flex flex-col items-center justify-center bg-slate-100">
  //       <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin" />

  //       <h2 className="mt-4 text-lg font-semibold text-slate-700">
  //         Loading Dashboard
  //       </h2>

  //       <p className="text-slate-500 text-sm">
  //         Verifying authentication...
  //       </p>
  //     </div>
  //   );
  // }
  if (loading) {
  return (
    <div className="h-dvh flex animate-pulse">
      <div className="w-64 bg-slate-900" />

      <div className="flex-1 p-6 bg-slate-100">
        <div className="h-10 bg-white rounded mb-6" />

        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

  return user ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}