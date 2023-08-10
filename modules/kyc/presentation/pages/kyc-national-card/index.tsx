import KycNationalCardView from "./kyc-national-card.view";
import {
  useDispatch,
  useErrorHandler,
  useIsMobile,
  useRedirectNotUser,
} from "@/core/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import TakePictureModalComponent from "../../components/take-picture-modal";
import uploadKycNationalCard from "@/modules/kyc/domain/usecases/uploadKycNationalCard";
import {
  closeLoadingModal,
  openLoadingModal,
} from "@/modules/_app/presentation/redux";
import useUser from "@/modules/auth/domain/usecases/useUser";
import useKycAuth from "../../hooks/useKycAuth";

type PropTypes = {};
export default function KycNationalCardPage(props: PropTypes) {
  const router = useRouter();
  const [pictureModalOpen, setPictureModalOpen] = useState(false);
  const { mutate } = useUser();
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();
  useRedirectNotUser();
  const isMobileDevice = useIsMobile();

  useKycAuth();

  const uploadImage = async (image: Blob) => {
    const missed = window.location.search?.includes("missed");
    dispatch(
      openLoadingModal({
        title: "در حال آپلود تصویر...",
        message: "لطفا چند لحظه منتظر بمانید.",
      })
    );
    const { error } = await uploadKycNationalCard(image);
    dispatch(closeLoadingModal());
    if (error) {
      errorHandler(error);
      return;
    }
    mutate();
    router.push("/kyc/national-card-serial" + (missed ? "?missed=1" : ""));
  };
  const handleOpenCamera = () => {
    if (!isMobileDevice) return setPictureModalOpen(true);
    let input = document.getElementById("camera-gateway");
    if (!input) {
      input = document.createElement("input");
      document.body.appendChild(input);
      Object.assign(input, {
        id: "camera-gateway",
        style: "display: none",
        type: "file",
        name: "file",
        accept: "image/*",
        capture: "camera",
      });
      input.addEventListener("change", (e: any) => {
        const file = (e?.target?.files || [])[0];
        if (!file) return;
        uploadImage(file);
      });
    }
    const doesSupport = !JSON.parse(JSON.stringify(input)).capture;
    if (!doesSupport) return setPictureModalOpen(true);
    input.click();
  };

  return (
    <>
      <KycNationalCardView
        openPictureModal={handleOpenCamera}
        hasCard={!router?.query?.missed}
      />
      <TakePictureModalComponent
        open={pictureModalOpen}
        onClose={() => setPictureModalOpen(false)}
        onSubmit={uploadImage}
      />
    </>
  );
}
