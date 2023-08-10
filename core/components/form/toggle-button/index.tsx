import { ButtonProps } from "@mui/material";
import ToggleButtonView from "./toggle-button.view";

type PropTypes = { selected?: boolean } & ButtonProps;
export default function ToggleButtonComponent(props: PropTypes) {
  return <ToggleButtonView {...props} />;
}
