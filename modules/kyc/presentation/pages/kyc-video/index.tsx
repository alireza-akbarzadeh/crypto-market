import KycVideoView from "./kyc-video.view";
import { useDispatch, useErrorHandler, useRedirectNotUser } from "@/core/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  closeLoadingModal,
  openAlert,
  openLoadingModal,
} from "@/modules/_app/presentation/redux";
import RecordVideoModalComponent from "../../components/record-video-modal";
import uploadKycVideo from "@/modules/kyc/domain/usecases/uploadKycVideo";
import useUser from "@/modules/auth/domain/usecases/useUser";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";
import useKycAuth from "../../hooks/useKycAuth";

type PropTypes = {};
export default function KycVideoPage(props: PropTypes) {
  const router = useRouter();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { mutate } = useUser();
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();
  useRedirectNotUser();
  const appInitials = useAppInitials();

  useKycAuth();

  const uploadVideo = async (video: Blob) => {
    dispatch(
      openLoadingModal({
        title: "در حال آپلود فیلم...",
        message: "لطفا چند لحظه منتظر بمانید.",
      })
    );
    const { data, error } = await uploadKycVideo(video);
    dispatch(closeLoadingModal());
    if (error) {
      errorHandler(error);
      return;
    }
    mutate();
    appInitials.mutate();
    dispatch(
      openAlert({
        title: data.title,
        message: data.description,
        skipCloseIcon: true,
        variant: "success",
        htmlMessage: true,
        actionButtons: [
          {
            title: "متوجه شدم",
            variant: "contained",
            handler: (close: any) => {
              close();
              router.push("/");
            },
          },
        ],
      })
    );
  };
  return (
    <>
      <KycVideoView openVideoModal={() => setVideoModalOpen(true)} />
      <RecordVideoModalComponent
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onSubmit={uploadVideo}
      />
    </>
  );
}
