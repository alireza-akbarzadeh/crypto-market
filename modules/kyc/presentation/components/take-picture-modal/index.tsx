import { getScreenShot } from "@/core/helpers";
import {
  useIsMobile,
  useIsMobileSize,
  useWindowDimensions,
  useDispatch,
} from "@/core/hooks";
import { openAlert } from "@/modules/_app/presentation/redux";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import TakePictureModalView from "./take-picture-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSubmit: (image: Blob) => void;
};
export default function TakePictureModalComponent(props: PropTypes) {
  const { open, onClose, onSubmit } = props;
  const webcamRef = useRef<Webcam>(null);
  const isMobileSize = useIsMobileSize();
  const { width, height } = useWindowDimensions();
  const isMobileDevice = useIsMobile();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageBlob, setImageBlob] = useState<Blob>();
  const dispatch = useDispatch();

  const capture = useCallback(async () => {
    const screenshot = await getScreenShot(webcamRef);
    if (!screenshot) return;
    const { blob, blobUrl } = screenshot;
    setImageBlob(blob);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl(blobUrl);
  }, [webcamRef]);

  const reset = () => {
    setImageUrl(undefined);
    setImageBlob(undefined);
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  const submit = async () => {
    if (!imageBlob) return;
    await onSubmit(imageBlob);
    reset();
    onClose();
  };
  const openMediaAccessError = (error: any) => {
    dispatch(
      openAlert({
        title: "اجازه دسترسی به دوربین داده نشد",
        message:
          "لطفا در تنظیمات مرورگر، بخش دسترسی‌ها اجازه دسترسی به دوربین را بدهید.",

        skipCloseIcon: true,
        actionButtons: [
          {
            title: "بستن",
            handler: (close: any) => {
              close();
              onClose();
            },
          },
        ],
      })
    );
  };

  return (
    <TakePictureModalView
      {...{
        open,
        onClose: handleClose,
        capture,
        webcamRef,
        isMobileSize,
        width,
        height,
        isMobileDevice,
        imageUrl,
        retake: reset,
        submit,
        openMediaAccessError,
      }}
    />
  );
}
