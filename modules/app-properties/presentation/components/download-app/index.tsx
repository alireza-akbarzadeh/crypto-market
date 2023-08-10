import { useState, useMemo } from "react";
import { UAParser } from "ua-parser-js";
import PwaModalComponent from "../pwa-modal";
import DownloadAppView from "./download-app.view";

type PropTypes = {};
export default function DownloadAppComponent(props: PropTypes) {
  const [pwaOpen, setPwaOpen] = useState(false);
  const isIos = useMemo(() => {
    const ua = new UAParser().getResult();
    return ua.os.name?.toLowerCase() === "ios";
  }, []);
  return (
    <>
      <DownloadAppView
        {...props}
        isIos={isIos}
        openPwaModal={() => setPwaOpen(true)}
      />
      <PwaModalComponent open={pwaOpen} onClose={() => setPwaOpen(false)} />
    </>
  );
}
