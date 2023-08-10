import { BoxProps } from "@mui/material";
import LoadingView from "./loading.view";

type PropTypes = {
  fullScreen?: boolean;
  loading?: boolean;
  page?: boolean;
} & BoxProps;
export default function LoadingComponent(props: PropTypes) {
  return <LoadingView {...props} />;
}
