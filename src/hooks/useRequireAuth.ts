import { useEffect } from "react";
import { useRouter } from "next/router";

const useRequireAuth = (status: string) => {
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);
};

export default useRequireAuth;