import Link from "next/link";
import React from 'react';

export default function Footer() {

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 py-7 border-t mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <Link href="/" className="font-extrabold text-xl text-white tracking-wide">
          Blog<span className="text-purple-400">In</span>
        </Link>
        <p className="text-gray-300 text-center text-sm">
          &copy; {new Date().getFullYear()} BlogIn. All rights reserved.
        </p>
        <div>
          <span className="text-gray-300 text-sm">
            Powered by <span className="font-semibold text-white">BlogIn</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
