import { useEffect, useState } from "react";
import { calculateTimeLeft } from "../helpers";

export default function useDateTimer(time: string | Date) {
  const [timeLeft, setTimeLeft] = useState<string>();

  useEffect(() => {
    const date = new Date(time);
    if (!date) return;

    setTimeLeft(calculateTimeLeft(date));
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(date);
      setTimeLeft(timeLeft);
      if (!timeLeft) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return timeLeft;
}
