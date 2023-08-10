import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket() {
  const socket = useRef<any>(null);
  useEffect(() => {
    socket.current = io("wss://live.crypto.me/");
    return () => {
      socket.current.disconnect();
    };
  }, []);
  return socket.current as Socket;
}
