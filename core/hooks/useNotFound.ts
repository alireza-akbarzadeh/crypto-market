import { useRouter } from "next/router";

export default function useNotFound() {
  const router = useRouter();

  return () => {
    router.replace("/404", router.asPath);
  };
}
