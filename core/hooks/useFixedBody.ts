import { useEffect } from "react";

export default function useFixedBody() {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.classList.add("overflow-hidden");
    }
    return () => {
      body?.classList.remove("overflow-hidden");
    };
  }, []);
}
