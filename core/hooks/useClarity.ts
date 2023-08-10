import { useEffect } from "react";

export default function useClarity() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const key = "awou2d9o2r";
    const w: any = window;
    w.clarity =
      w.clarity ||
      function () {
        (w.clarity.q = w.clarity.q || []).push(arguments);
      };
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.clarity.ms/tag/" + key;
    const firstScript = document.getElementsByTagName("script")[0];
    if (!firstScript?.parentNode) {
      document.getElementsByTagName("head")[0].appendChild(script);
      return;
    }
    firstScript.parentNode.insertBefore(script, firstScript);
  }, []);
}
