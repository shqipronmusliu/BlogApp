import Link from "next/link";
import { Newspaper, User2 } from "lucide-react";
import React from 'react';

export default function AdminSidebar() {
  return (
    <aside className="top-14 left-0 min-h-screen w-60 bg-gradient-to-b from-gray-700 to-blue-900 shadow-xl flex flex-col py-8 px-4 z-40">
      <div className="mb-10 text-2xl font-bold text-white text-center tracking-wide">Paneli i Adminit</div>
      <nav className="flex flex-col gap-4">
         <Link
            href="/admin"
            className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-blue-800 transition text-white font-medium text-lg"
         >
            <Newspaper size={22} /> Lajmet
         </Link>
         <Link
            href="/admin/profile"
            className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-blue-800 transition text-white font-medium text-lg"
         >
            <User2 size={22} /> Profili
         </Link>
      </nav>
    </aside>
  );
}
