import useUser from "@/modules/auth/domain/usecases/useUser";
import CoinAssetView from "./coin-asset.view";
import TradeModalComponent from "../../components/trade-modal";
import { useEffect, useState } from "react";
import { useAssetItems } from "@/modules/asset/domain/usecases/useAssetItems";
import { TradeInterface } from "@/modules/asset/domain/entities/asset";
import { useDispatch, useErrorHandler, useIsDesktopSize } from "@/core/hooks";
import { openAlert } from "@/modules/_app/presentation/redux";
import deleteAsset from "@/modules/asset/domain/usecases/deleteAsset";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

type PropTypes = {};
export default function CoinAssetPage(props: PropTypes) {
  const { user, userLoading } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<TradeInterface>();
  const { data, mutate } = useAssetItems();
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [shouldLoadChart, setShouldLoadChart] = useState(false);
  const isDesktopSize = useIsDesktopSize();
  useEffect(() => {
    if (isDesktopSize) setShouldLoadChart(true);
  }, [isDesktopSize]);

  const handleOpenModal = (data?: any) => {
    setModalInfo(data);
    setModalOpen(true);
  };
  const handleDelete = async () => {
    const { data: res, error } = await deleteAsset(data!.asset.id);
    if (error) {
      errorHandler(error);
      return;
    }
    enqueueSnackbar(res, { variant: "success" });
    router.replace("/portfolio");
  };
  const onDelete = () => {
    dispatch(
      openAlert({
        title: "آیا از حذف این دارایی اطمینان دارید؟",
        variant: "delete",
        skipCloseIcon: true,
        actionButtons: [
          {
            title: "خیر",
            variant: "outlined",
            handler: (close: any) => {
              close();
            },
          },
          {
            title: "بله",
            variant: "contained",
            handler: async (close: any) => {
              await handleDelete();
              close();
            },
          },
        ],
      })
    );
  };

  return (
    <>
      <CoinAssetView
        {...{
          user,
          handleOpenModal,
          userLoading,
          data,
          onDelete,
          shouldLoadChart,
        }}
      />
      <TradeModalComponent
        allowSideEdit={data?.asset.allowSideEdit}
        coin={data?.asset.currency}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalInfo}
        mutate={mutate}
        availableAsset={data?.asset.totalAmount || 0}
      />
    </>
  );
}
