import TabsView from "./tabs.view";
import { MDCTabBar } from "@material/tab-bar";
import { useEffect, useRef } from "react";

type PropTypes<T, V = any> = {
  items: T[];
  active: V;
  onChange: (value: V) => void;
  valueSelector: (item: T) => V;
  labelSelector: (item: T) => string;
  className?: string;
};
export default function TabsComponent<T>(props: PropTypes<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const tabBar = new MDCTabBar(rootRef.current);
    tabBar.initialize();
    return () => {
      tabBar.destroy();
    };
  }, [rootRef]);

  return <TabsView {...props} rootRef={rootRef} />;
}
