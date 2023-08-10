import { useRouterLoading } from "@/core/hooks";
import { useEffect, useState } from "react";
import AppPageProgressView from "./app-page-progress.view";

type PropTypes = {
  className?: string;
  delay?: number;
};
export default function AppPageProgressComponent(props: PropTypes) {
  const { delay = 80, ...other } = props;
  const [progress, setProgress] = useState<boolean>();
  const loading = useRouterLoading();

  useEffect(() => {
    if (!loading) {
      setProgress(false);
      return () => {
        setProgress(undefined);
      };
    }
    const timeout = setTimeout(() => {
      setProgress(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [loading]);

  return <AppPageProgressView {...other} progress={progress} />;
}
