import LoadingModalView from "./loading-modal.view";

type PropTypes = {
  open: boolean;
  children?: any;
  title?: string;
  message?: string;
};
export default function LoadingModalComponent(props: PropTypes) {
  return <LoadingModalView {...props} />;
}
