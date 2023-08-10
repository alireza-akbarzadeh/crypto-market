import { useEffect, useState } from "react";
import useSelector from "./useSelector";

export default function useTokenRoute() {
  const { token } = useSelector((s) => s.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (route: string) => route;
  return (route: string) => {
    if (token) return `${route}?token=${token}`;
    return route;
  };
}
