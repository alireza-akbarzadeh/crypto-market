import { useDispatch, useErrorHandler, useIsMobile } from "@/core/hooks";
import submitSell from "@/modules/order/domain/usecases/submitSell";
import useSellSteps from "@/modules/order/domain/usecases/useSellSteps";
import { openAlert } from "@/modules/_app/presentation/redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import SellAddressView from "./sell-address.view";

type PropTypes = {
  onNext: () => void;
  onPrev: () => void;
  ibanId?: string;
};
export default function SellAddressComponent(props: PropTypes) {
  const { onNext, onPrev, ibanId } = props;
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isTagQr, setIsTagQr] = useState(false);
  const { data } = useSellSteps();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data?.depositAddress.address) return;
    dispatch(
      openAlert({
        message: `
        ${
          data?.depositAddress.tag
            ? "<p>هنگام ارسال ارز آدرس و تگ یا ممو هر دو باهم باید وارد شوند. در غیر این صورت بیت‌برگ هیچگونه مسئولیتی ندارد.</p>"
            : ""
        }
        <p>کاربر گرامی آدرس های کریپو ثابت نیستند و برای هر بار فروش اقدام به دریافت آدرس جدید نمایید.</p>
        `,
        // "هنگام ارسال ارز آدرس و تگ یا ممو هر دو باهم باید وارد شوند. در غیر این صورت بیت‌برگ هیچگونه مسئولیتی ندارد.",
        variant: "warning",
        htmlMessage: true,
        skipCloseIcon: true,
        actionButtons: [
          {
            title: "می‌پذیرم",
            time: 5,
            handler: (close: any) => {
              close();
            },
          },
        ],
      })
    );
  }, [data?.depositAddress.address]);

  const handleOpenModal = (isTag: boolean) => {
    setIsTagQr(isTag);
    setQrModalOpen(true);
  };
  const handleNext = async () => {
    const { error, data } = await submitSell(router.query?.id, ibanId);
    if (error) {
      errorHandler(error);
      return;
    }
    enqueueSnackbar(data, { variant: "success" });
    onNext();
  };

  return (
    <SellAddressView
      {...{
        handlePrev: onPrev,
        handleNext,
        data: data!,
        qrModalOpen,
        closeQrModal: () => setQrModalOpen(false),
        openQrModal: handleOpenModal,
        isTagQr,
        isMobile,
      }}
    />
  );
}
