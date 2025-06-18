import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.nextauth.token?.role;

  if (pathname === "/api/blogs" && req.method === "GET") {
    return NextResponse.next();
  }

  if (pathname === "/api/blogs" && req.method === "POST" && !["user","admin"].includes(role as string)) {
    return NextResponse.redirect(new URL("/sign-in?callbackUrl=/", req.url));
  }
  if (pathname.startsWith("/api/blogs/") && req.method === "DELETE" && !["user","admin"].includes(role as string)) {
    return NextResponse.redirect(new URL("/sign-in?callbackUrl=/", req.url));
  }

  if (pathname === "/create/blog" && !["user","admin"].includes(role as string)) {
    return NextResponse.redirect(new URL("/sign-in?callbackUrl=/create/blog", req.url));
  }
}, {
  callbacks: { authorized: () => true }
});

export const config = {
  matcher: [
    "/api/blogs",
    "/api/blogs/:path*",
    "/create/blog",
    "/api/blogs",
    "/create/news",
    "/create/news/:path*",
  ],
};
