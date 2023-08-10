import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";

export default function useReactGa() {
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!initialized) {
      ReactGA.initialize("UA-129748076-1");
      setInitialized(true);
    }
    ReactGA.pageview(router.asPath);
  }, [router.asPath]);
}
