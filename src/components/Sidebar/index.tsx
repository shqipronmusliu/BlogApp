import Link from "next/link";
import { LayoutDashboard, User2 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="top-14 left-0 min-h-screen w-60 bg-gradient-to-b from-gray-700 to-blue-900 shadow-xl flex flex-col py-8 px-4 z-40">
      <div className="mb-10 text-3xl font-bold text-white text-center tracking-wide">Dashboard</div>
      <nav className="flex flex-col gap-4">
         <Link
            href="/dashboard"
            className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-blue-800 transition text-white font-medium text-lg"
         >
            <LayoutDashboard size={22} /> Dashboard
         </Link>
         <Link
            href="/profile"
            className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-blue-800 transition text-white font-medium text-lg"
         >
            <User2 size={22} /> Profile
         </Link>
      </nav>
    </aside>
  );
}
