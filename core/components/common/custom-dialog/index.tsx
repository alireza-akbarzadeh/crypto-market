import { DialogProps } from "@mui/material";
import CustomDialogView from "./custom-dialog.view";

type PropTypes = {
  title?: string;
  renderHeader?: (onClose: any) => React.ReactNode;
} & DialogProps;
export default function CustomDialogComponent(props: PropTypes) {
  return <CustomDialogView {...props} />;
}
