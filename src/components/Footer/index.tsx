import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  
  return (
    <footer className="bg-gradient-to-r from-gray-700 py-7 border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <Link href="/" className="font-extrabold text-xl text-white tracking-wide">
          Blog<span className="text-grey">In</span>
        </Link>
        <p className="text-white/80 text-center text-sm">
          &copy; {new Date().getFullYear()} BlogIn. All rights reserved.
        </p>
        <div>
          <span className="text-white/70 text-sm">
            Powered by <span className="font-bold text-white">BlogIn</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
