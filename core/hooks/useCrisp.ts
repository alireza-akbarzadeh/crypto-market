import useUser from "@/modules/auth/domain/usecases/useUser";
import { useEffect, useState } from "react";

const isInitialized = () => {
  return Boolean(typeof window !== "undefined" && (window as any).$crisp);
};
export default function useCrisp() {
  const { user } = useUser();
  const [initialized, setInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const w: any = typeof window === "undefined" ? undefined : window;

  const open = () => {
    if (!initialized) return;
    w.$crisp.push(["do", "chat:open"]);
  };
  useEffect(() => {
    if (isInitialized()) {
      setInitialized(true);
      return;
    }
    w.$crisp = [];
    w.CRISP_WEBSITE_ID = "a8b7a3c9-bb22-41da-a69f-dbf4ee62add1";
    w.CRISP_RUNTIME_CONFIG = {
      locale: "fa",
      width: 300,
    };
    const _script = document.createElement("script");
    _script.src = "https://client.crisp.chat/l.js";
    _script.async = true;
    document.getElementsByTagName("head")[0].appendChild(_script);
    setInitialized(true);

    w.$crisp.push([
      "on",
      "chat:opened",
      function () {
        setIsOpen(true);
        // document.getElementById("app-shell")?.classList.remove("loader");
      },
    ]);
    w.$crisp.push([
      "on",
      "chat:closed",
      function () {
        setIsOpen(false);
      },
    ]);
  });

  useEffect(() => {
    if (!initialized) return;
    if (!user || !user?.fullName) return;
    const { $crisp } = w;
    $crisp.push(["set", "user:nickname", user.fullName]);
    $crisp.push(["set", "user:phone", user.phoneNumber]);
  }, [user, initialized]);

  return { open, initialized, isOpen };
}
