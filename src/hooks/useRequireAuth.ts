import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Options {
  role?: "user" | "admin";
  redirectTo?: string;
}

export default function useRequireAuth({ role, redirectTo = "/sign-in" }: Options) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace(redirectTo);
    } else if (role && session.user.role !== role) {
      router.replace(redirectTo);
    }
  }, [session, status, role, redirectTo, router]);
}
