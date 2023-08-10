import { getScreenShot } from "@/core/helpers";
import { useDispatch } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openAlert } from "@/modules/_app/presentation/redux";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Webcam from "react-webcam";
import RecordVideoModalView from "./record-video-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSubmit: (video: Blob) => void;
};
export default function RecordVideoModalComponent(props: PropTypes) {
  const { open, onClose, onSubmit } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [blob, setBlob] = useState<Blob>();
  const [url, setUrl] = useState<string>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [shouldSave, setShouldSave] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mimeType, setMimeType] = useState<string>();
  const { user } = useUser();
  const [startMoment, setStartMoment] = useState<number>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof MediaRecorder === "undefined") return;
    if (typeof MediaRecorder.isTypeSupported !== "function") return;
    if (MediaRecorder.isTypeSupported("video/webm"))
      return setMimeType("video/webm");
    if (MediaRecorder.isTypeSupported("video/mp4"))
      return setMimeType("video/mp4");
    if (MediaRecorder.isTypeSupported("video/ogg"))
      return setMimeType("video/ogg");
    if (MediaRecorder.isTypeSupported("video/x-matroska"))
      return setMimeType("video/x-matroska");
  }, []);

  useEffect(() => {
    if (!capturing) return;
    const timeout = setTimeout(() => {
      stopRecording();
    }, 15000);
    return () => {
      clearTimeout(timeout);
    };
  }, [capturing]);

  useEffect(() => {
    if (!recordedChunks.length) return;

    if (!shouldSave) {
      setRecordedChunks([]);
      return;
    }

    setShouldSave(false);
    handleReview();
  }, [recordedChunks]);

  const startRecording = () => {
    if (!webcamRef?.current?.stream || typeof MediaRecorder === "undefined")
      return;
    (mediaRecorderRef as any).current = new MediaRecorder(
      webcamRef.current.stream,
      {
        mimeType,
      }
    );
    mediaRecorderRef.current!.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current!.start();
    setStartMoment(Date.now());
    setCapturing(true);
  };

  const stopRecording = () => {
    if (
      !startMoment ||
      !mediaRecorderRef.current ||
      mediaRecorderRef.current.state === "inactive"
    )
      return;
    if (Date.now() - startMoment > 5000) {
      setShouldSave(true);
    }
    mediaRecorderRef.current.stop();
    setStartMoment(undefined);
    setCapturing(false);
  };

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const setScreenshot = async () => {
    const screenshot = await getScreenShot(webcamRef);
    if (!screenshot) return;
    const { blobUrl } = screenshot;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(blobUrl);
  };

  const handleReview = useCallback(() => {
    if (!recordedChunks.length) return;

    const _blob = new Blob(recordedChunks, {
      type: mimeType,
    });
    const _url = URL.createObjectURL(_blob);
    if (url) {
      URL.revokeObjectURL(url);
    }
    setBlob(_blob);
    setUrl(_url);
    setScreenshot();

    // const a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    // a.href = _url;
    // a.download = "react-webcam-stream-capture.mp4";
    // a.click();
    // window.URL.revokeObjectURL(_url);

    setRecordedChunks([]);
  }, [recordedChunks]);

  const reset = () => {
    setIsPlaying(false);
    if (url) {
      URL.revokeObjectURL(url);
    }
    setBlob(undefined);
    setUrl(undefined);
    setPreviewUrl(undefined);
  };
  const onPlay = () => {
    if (!videoRef.current) return;
    setIsPlaying(true);
    videoRef.current.play();
  };
  const submit = async () => {
    if (!blob) return;
    await onSubmit(blob);
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
    <RecordVideoModalView
      {...{
        open,
        onClose,
        retake: reset,
        submit,
        startRecording,
        stopRecording,
        webcamRef,
        url,
        capturing,
        videoRef,
        onPlay,
        shouldSave,
        notSupported: !mimeType,
        isPlaying,
        mimeType,
        setPaused: () => setIsPlaying(false),
        previewUrl,
        user,
        openMediaAccessError,
      }}
    />
  );
}
