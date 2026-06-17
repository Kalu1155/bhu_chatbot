import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}