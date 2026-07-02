import {
  FaHome,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaQuestion ,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Sidebar({sidebarOpen,setSidebarOpen}){
   const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }

    navigate("/");
  };
  return (
   <aside
  className={`
  fixed md:relative
  z-50
  h-full
  w-64
  bg-slate-900
  text-white
  flex
  flex-col
  transition-transform
  duration-300
  ${
    sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full"
  }
  md:translate-x-0
`}
>
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        BHU-CHATBOT
      </div>
<div className="md:hidden absolute right-4 top-5">
  <button
    onClick={() =>
      setSidebarOpen(false)
    }
  >
    <FaTimes />
  </button>
</div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
                }`
              }
            >
              <FaHome />
              Dashboard
            </NavLink>

          </li>

          <li>
            <NavLink
              to="/faqs"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
                }`
              }
            >
              <FaQuestionCircle />
              FAQs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
                }`
              }
            >
              <FaCog />
              Settings
            </NavLink>
          </li>
           <li>
            <NavLink
              to="/questions"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
                }`
              }
            >
              <FaQuestion />
              Questions
            </NavLink>
          </li>
        </ul>

      </nav>

      <div className="p-4 border-t border-slate-700">
       <button
  onClick={handleLogout}
  className="flex items-center gap-3 hover:text-red-400 transition"
>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}