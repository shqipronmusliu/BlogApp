import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
    { name: "News", path: "/news" },
  ];
  if (status === "authenticated") {
    menu.push({ name: "Dashboard", path: "/dashboard" });
  }

  return (
    <header className="fixed z-50 top-0 left-0 h-14 w-full bg-gradient-to-r from-gray-700 to-sky-300 text-white shadow">
      <nav className="container mx-auto flex items-center justify-between py-2 px-3">
        <Link href="/" className="flex items-center gap-1 font-extrabold text-2xl tracking-tight select-none">
          <span className="text-white">Blog</span>
          <span className="bg-white rounded px-2 py-0.5 text-gray-700 shadow font-bold ml-1">In</span>
        </Link>
        <div className="flex gap-8">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-colors duration-200 ${
                router.pathname === item.path
                  ? "font-bold text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-1 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition"
            >
              Dil
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/sign-up")}
                className="px-4 py-1 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-100 transition"
              >
                Regjistrohu
              </button>
              <button
                onClick={() => router.push("/sign-in")}
                className="px-4 py-1 rounded-lg bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                Kyçu
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
