import AlertModalComponent from "@/core/components/common/alert-modal";
import styles from "./app-alert-modal.module.scss";

type PropTypes = {
  open: boolean;
  onClose: () => void;
};
export default function AppAlertModalView(props: PropTypes) {
  return <AlertModalComponent {...props} />;
}
