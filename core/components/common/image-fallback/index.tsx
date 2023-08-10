import { ImageProps, StaticImageData } from "next/image";
import { ReactNode, useEffect, useState } from "react";
import ImageFallbackView from "./image-fallback.view";

interface StaticRequire {
  default: StaticImageData;
}
type PropTypes = Omit<ImageProps, "src"> & {
  src?: string | StaticRequire | StaticImageData;
  fallback?: string | StaticRequire | StaticImageData;
  fallbackElement?: ReactNode;
};
export default function ImageFallbackComponent(props: PropTypes) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
  }, [props.src]);
  return (
    <ImageFallbackView
      {...props}
      loaded={loaded}
      handleLoaded={({ naturalWidth }) => {
        if (!naturalWidth) return;
        setLoaded(true);
      }}
    />
  );
}
