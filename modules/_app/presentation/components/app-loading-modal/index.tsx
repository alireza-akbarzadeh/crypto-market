import { useSelector } from "@/core/hooks";
import AppLoadingModalView from "./app-loading-modal.view";

type PropTypes = {};
export default function AppLoadingModalComponent(props: PropTypes) {
  const { isLoadingModalOpen, loadingModalOptions } = useSelector((s) => s.app);
  return (
    <AppLoadingModalView
      {...{
        open: isLoadingModalOpen,
        ...loadingModalOptions,
      }}
    />
  );
}
