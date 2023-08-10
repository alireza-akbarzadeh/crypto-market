import { useEffect, useState } from "react";

export default function useComponentExists() {
  const [exists, setExists] = useState(false);
  useEffect(() => {
    setExists(true);
    return () => {
      setExists(false);
    };
  }, []);
  return exists;
}
