import AppBottomNavView from "./app-bottom-nav.view";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PropTypes = {};
export default function AppBottomNavComponent(props: PropTypes) {
  const [value, setValue] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (
      (router.asPath || "").includes("/profile") &&
      router.asPath !== "/profile/wallet"
    ) {
      setValue("/profile");
      return;
    }
    setValue(router.asPath);
  }, [router.asPath]);

  const handleChange = (_: any, val: string) => {
    if (val === value) return;
    // if (val === "/profile") {
    //   setValue(val);
    //   router.push("/profile/account");
    //   return;
    // }
    setValue(val);
    router.push(val);
  };
  return <AppBottomNavView {...{ handleChange, value }} />;
}
