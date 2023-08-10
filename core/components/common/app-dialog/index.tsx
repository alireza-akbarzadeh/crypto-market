import AppDialogView from "./app-dialog.view";
import { DialogProps } from "@mui/material";
import { ReactNode } from "react";

type PropTypes = {
  renderClose?: () => ReactNode;
  closeOnOutside?: boolean;
  contentClassName?: string;
  fullScreenMobile?: boolean;
  mobileStyle?: 1 | 2 | 3 | 4;
  logoHeader?: boolean;
  headerClassName?: string;
  titleClassName?: string;
  customHeaderContent?: any;
} & DialogProps;
export default function AppDialogComponent(props: PropTypes) {
  return <AppDialogView {...props} />;
}
