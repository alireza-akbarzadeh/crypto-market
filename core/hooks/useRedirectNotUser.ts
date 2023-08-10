import { useEffect } from "react";
import { useSelector } from "@/core/hooks";
import { useRouter } from "next/router";
import { getLocalStorageToken } from "../helpers";

export default function useRedirectNotUser(callback?: () => void) {
  const router = useRouter();
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    const _token = getLocalStorageToken();
    if (!token && !_token) {
      if (callback) return callback();
      router.replace("/");
    }
  }, [token]);
}
