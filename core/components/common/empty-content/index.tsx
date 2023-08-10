import { BoxProps } from "@mui/material";
import EmptyContentView from "./empty-content.view";

type PropTypes = {
  small?: boolean;
  message: string;
  buttonProps?: {
    onClick: () => void;
    label: string;
  };
} & BoxProps;
export default function EmptyContentComponent(props: PropTypes) {
  return <EmptyContentView {...props} />;
}
