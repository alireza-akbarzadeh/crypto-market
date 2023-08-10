import { useEffect, useState } from "react";
import { useSocket } from "@/core/hooks";
type CoinSocketUpdateType = {
  [key: string]: {
    changes: number;
    price: number;
  };
};
export default function useCoinSocket() {
  const socket = useSocket();
  const [data, setData] = useState<CoinSocketUpdateType>();

  useEffect(() => {
    if (!socket) return;
    // socket.on("connect", () => {
    //   console.log("SOCKET CONNECTED");
    // });
    socket.on("greeting-from-server", ({ greeting }) => {
      const data: any = {};
      greeting.forEach(({ s: name, P: changes, c: price }: any) => {
        name = name.replace("USDT", "");

        changes = +changes;
        price = +price;
        data[name] = {
          changes,
          price,
        };
      });
      setData(data);
      // console.log("DATA", data);
    });
    // socket.on("disconnect", () => {
    //   console.log("SOCKET DISCONNECTED");
    // });
  }, [socket]);

  return data;
}
