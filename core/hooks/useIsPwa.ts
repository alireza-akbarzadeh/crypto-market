import { useMemo } from "react";

export default function useIsPwa() {
  return useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return !!(navigator as any).standalone;
  }, [typeof navigator === "undefined"]);
}
