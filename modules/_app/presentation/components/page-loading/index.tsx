import PageLoadingView from "./page-loading.view";
import { useEffect, useState } from "react";

type PropTypes = {};
export default function PageLoadingComponent(props: PropTypes) {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    setInitialized(true);
  }, []);
  return <PageLoadingView {...{ initialized }} />;
}
