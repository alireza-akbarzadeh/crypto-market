import { useEffect, useState } from "react";
import { calculateTimeLeft } from "../helpers";

export default function useDateTimer(time: number) {
  const [timeLeft, setTimeLeft] = useState<number>(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t < 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return timeLeft;
}
