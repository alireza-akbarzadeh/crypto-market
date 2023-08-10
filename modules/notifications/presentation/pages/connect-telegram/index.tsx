import { useErrorHandler } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import connectTelegram from "@/modules/notifications/domain/usecases/connectTelegram";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ConnectTelegramView from "./connect-telegram.view";

type PropTypes = {};
export default function ConnectTelegramPage(props: PropTypes) {
  const router = useRouter();
  const errorHandler = useErrorHandler();
  const [data, setData] = useState<any>();
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      if (typeof router?.query?.chatId !== "string" || !user) return;
      const { data, error } = await connectTelegram(router.query.chatId);
      if (error) {
        setData({
          success: false,
          title: "عملیات ناموفق بود",
        });
        return errorHandler(error);
      }
      setData({
        success: true,
        title: data,
      });
    })();
  }, [router.query.chatId, user]);

  return <ConnectTelegramView data={data} user={user} />;
}
