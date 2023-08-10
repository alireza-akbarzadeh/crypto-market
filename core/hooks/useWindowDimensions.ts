import { useDebouncedEffect } from ".";
import { useEffect, useState } from "react";

function getWindowDimensions() {
  if (!window) return { width: 0, height: 0 };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      const value = getWindowDimensions();
      if (
        windowDimensions.width === value.width &&
        windowDimensions.height === value.height
      )
        return;
      setWindowDimensions(value);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
