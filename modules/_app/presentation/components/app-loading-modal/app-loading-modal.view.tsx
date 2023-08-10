import LoadingModalComponent from "@/core/components/common/loading-modal";
import styles from "./app-loading-modal.module.scss";

type PropTypes = {
  open: boolean;
  children?: any;
  title?: string;
  message?: string;
};
export default function AppLoadingModalView(props: PropTypes) {
  return <LoadingModalComponent {...props} />;
}
