import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
    { name: "News", path: "/news" },
  ];

  if (status === "authenticated") {
    if (session?.user?.role === "admin") {
      menu.push({ name: "Admin Panel", path: "/admin" });
    } else {
      menu.push({ name: "Dashboard", path: "/dashboard" });
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-gradient-to-r from-gray-700 to-sky-300 text-white shadow z-50">
      <nav className="container mx-auto flex items-center justify-between h-full px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 font-extrabold text-2xl tracking-tight select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          aria-label="MyApp Home"
        >
          <span>Blog</span>
          <span className="bg-white rounded px-2 py-0.5 text-gray-700 shadow font-bold ml-1">
            In
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {menu.map((item) => {
            const isActive = router.pathname === item.path;

            if (isActive) {
              return (
                <span
                  key={item.path}
                  className="font-bold text-white cursor-default"
                  aria-current="page"
                >
                  {item.name}
                </span>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                scroll={false}
                className="text-white/80 hover:text-white transition-colors duration-200 focus:outline-none"
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-2">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-1 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Dil
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/sign-up")}
                className="px-4 py-1 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Regjistrohu
              </button>
              <button
                onClick={() => router.push("/sign-in")}
                className="px-4 py-1 rounded-lg bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Kyçu
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-gradient-to-r from-gray-700 to-sky-300 border-t">
          <div className="flex flex-col space-y-2 p-4">
            {menu.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                scroll={false}
                aria-current={router.pathname === item.path ? "page" : undefined}
                className="py-2 text-white/90 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {status === "authenticated" ? (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="mt-4 px-4 py-1 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Dil
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/sign-up");
                  }}
                  className="mt-4 px-4 py-1 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Regjistrohu
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/sign-in");
                  }}
                  className="mt-2 px-4 py-1 rounded-lg bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Kyçu
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
