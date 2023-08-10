import { useSelector } from "@/core/hooks";
import http from "@/core/http";
import { useState, useEffect } from "react";
import PrivateImageView, { PrivateImageViewProps } from "./private-image.view";

type PropTypes = PrivateImageViewProps;
export default function PrivateImageComponent(props: PropTypes) {
  const { src, ...other } = props;
  const { token } = useSelector((s) => s.auth);
  const [_src, _setSrc] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!src || !token) return;
      const res: any = await http.get(src, { responseType: "blob" });
      if (!res || !res.size) return;
      const imageObjectURL = URL.createObjectURL(res);
      if (!imageObjectURL) return;
      if (_src) {
        URL.revokeObjectURL(_src);
      }
      _setSrc(imageObjectURL);
    })();
  }, [src, token]);

  return <PrivateImageView src={_src} {...other} />;
}
