import { BoxProps } from "@mui/material";
import AppMenuFooterView from "./app-menu-footer.view";

type PropTypes = {} & BoxProps;
export default function AppMenuFooterComponent(props: PropTypes) {
  return <AppMenuFooterView {...props} />;
}
