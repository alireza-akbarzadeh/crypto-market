import { useDispatch, useSelector } from "@/core/hooks";
import { closeAlert } from "../../redux";
import AppAlertModalView from "./app-alert-modal.view";

type PropTypes = {};
export default function AppAlertModalComponent(props: PropTypes) {
  const { isAlertOpen, alertOptions } = useSelector((s) => s.app);
  const dispatch = useDispatch();

  return (
    <AppAlertModalView
      {...{ open: isAlertOpen, onClose: () => dispatch(closeAlert()) }}
      {...alertOptions}
    />
  );
}
