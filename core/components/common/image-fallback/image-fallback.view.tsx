import styles from "./image-fallback.module.scss";
import Image, { ImageProps, StaticImageData } from "next/image";
import clsx from "clsx";
import { ReactNode } from "react";

interface StaticRequire {
  default: StaticImageData;
}
type PropTypes = Omit<ImageProps, "src"> & {
  fallback?: string | StaticRequire | StaticImageData;
  fallbackElement?: ReactNode;
  src?: string | StaticRequire | StaticImageData;
  loaded: boolean;
  handleLoaded: (e: any) => void;
};
export default function ImageFallbackView(props: PropTypes) {
  const {
    loaded,
    fallback,
    fallbackElement,
    src,
    className,
    handleLoaded,
    ...other
  } = props;
  return (
    <>
      {Boolean(src) && (
        <Image
          {...other}
          src={src!}
          className={clsx({
            [className || ""]: true,
            [styles.main]: true,
            [styles.loading]: !loaded,
          })}
          onLoadingComplete={handleLoaded}
        />
      )}
      {Boolean(!loaded && fallback) && (
        <Image
          {...other}
          src={fallback!}
          className={clsx(className, styles.fallback)}
        />
      )}
      {Boolean(!loaded && !fallback && fallbackElement) && fallbackElement}
    </>
  );
}
