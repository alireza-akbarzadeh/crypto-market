import styles from "./tabs.module.scss";
import clsx from "clsx";
import { Typography } from "@mui/material";
import { RefObject } from "react";

type PropTypes<T, V = any> = {
  items: T[];
  active: V;
  onChange: (value: V) => void;
  valueSelector: (item: T) => V;
  labelSelector: (item: T) => string;
  rootRef: RefObject<HTMLDivElement>;
  className?: string;
};
export default function TabsView<T>(props: PropTypes<T>) {
  const {
    active,
    items,
    onChange,
    valueSelector,
    labelSelector,
    rootRef,
    className,
  } = props;

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, "mdc-tab-bar", className)}
      role="tablist"
    >
      <div className="mdc-tab-scroller">
        <div className="mdc-tab-scroller__scroll-area">
          <div className="mdc-tab-scroller__scroll-content">
            {items.map((item, idx) => {
              const value = valueSelector(item);
              const label = labelSelector(item);
              const isActive = active === value;

              return (
                <button
                  key={value as any}
                  onClick={() => onChange(value)}
                  className={clsx({
                    "mdc-tab": true,
                    "mdc-tab--active": isActive,
                  })}
                  role="tab"
                  aria-selected="true"
                  tabIndex={0}
                >
                  <span className="mdc-tab__content">
                    {/* <span
                  className="mdc-tab__icon material-icons"
                  aria-hidden="true"
                >
                  favorite
                </span> */}
                    <Typography
                      component="span"
                      className="mdc-tab__text-label"
                    >
                      {label}
                    </Typography>
                  </span>
                  <span
                    className={clsx({
                      "mdc-tab-indicator": true,
                      "mdc-tab-indicator--active": isActive,
                    })}
                  >
                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  {/* <span className="mdc-tab__ripple"></span> */}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
