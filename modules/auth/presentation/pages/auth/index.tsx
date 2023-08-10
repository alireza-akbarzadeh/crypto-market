import { useSelector } from "@/core/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthModalStack } from "../../utils/enums";
import AuthView from "./auth.view";

const validDomains = [
  "https://crypto.com/",
  "https://crypto.me/",
  "https://nftno.io/",
];

type PropTypes = {};
export default function AuthPage(props: PropTypes) {
  const [stack, setStack] = useState<AuthModalStack[]>([]);
  const router = useRouter();
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!token) return;

    let origin = router.query.back as string;
    if (typeof origin !== "string") {
      router.replace("/");
      return;
    }

    const valid = validDomains.find((d) => origin.startsWith(d));
    if (!valid) {
      router.replace("/");
      return;
    }

    if (!origin.includes("?")) origin = origin + "?";
    const tokenQuery = new URLSearchParams({ token }).toString();
    window.location.href = origin + tokenQuery;
  }, [token, router.query]);

  const onPush = (route: AuthModalStack) => {
    setStack((s) => [route, ...s]);
  };
  const onReplace = (route: AuthModalStack) => {
    const newStack = [...stack];
    if (stack.length) {
      newStack.shift();
    }
    setStack([route, ...newStack]);
  };
  const onReset = () => {
    setStack([]);
  };
  const onBack = () => {
    if (!stack.length) {
      return;
    }
    setStack(stack.slice(1, stack.length));
  };
  return (
    <AuthView
      {...{
        current: stack[0],
        onBack,
        onPush,
        onReplace,
        onReset,
      }}
    />
  );
}
