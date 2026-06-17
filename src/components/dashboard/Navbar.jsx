import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { getAdminByEmail } from "../../services/adminService";

export default function Navbar() {
  const [adminName, setAdminName] =
    useState("Admin");

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const admin =
          await getAdminByEmail(
            user.email
          );

        setAdminName(
          admin?.fullname || "Admin"
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadAdmin();
  }, []);

  const firstLetter =
    adminName.charAt(0).toUpperCase();

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between">
      <h1 className="font-bold text-2xl">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {firstLetter}
        </div>

        <span>{adminName}</span>
      </div>
    </header>
  );
}