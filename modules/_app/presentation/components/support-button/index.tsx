import { useDispatch } from "@/core/hooks";
import { openSupport } from "@/modules/support/presentation/redux";
import { ButtonBaseProps } from "@mui/material";
import SupportButtonView from "./support-button.view";

type PropTypes = {} & ButtonBaseProps;
export default function SupportButtonComponent(props: PropTypes) {
  const dispatch = useDispatch();

  return (
    <SupportButtonView
      {...props}
      openSupport={() => dispatch(openSupport(undefined))}
    />
  );
}
