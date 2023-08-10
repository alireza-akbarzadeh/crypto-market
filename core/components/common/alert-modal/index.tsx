import AlertModalView, {
  ActionButtonProps,
  AlertVariant,
} from "./alert-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  children?: any;
  variant?: AlertVariant;
  message?: string;
  actionButtons?: ActionButtonProps[];
  skipCloseIcon?: boolean;
  htmlMessage?: boolean;
  icon?: any;
};
export default function AlertModalComponent(props: PropTypes) {
  return <AlertModalView {...props} />;
}
