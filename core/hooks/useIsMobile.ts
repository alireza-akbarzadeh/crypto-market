import { MOBILE_REG } from "./../constants/regex";
import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(MOBILE_REG.test(navigator.userAgent));
  }, []);
  return isMobile;
}
