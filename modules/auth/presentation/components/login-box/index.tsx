import { useDispatch } from "@/core/hooks";
import { openLoginModal } from "../../redux";
import LoginBoxView from "./login-box.view";

type PropTypes = {};
export default function LoginBoxComponent(props: PropTypes) {
  const dispatch = useDispatch();

  return <LoginBoxView openLoginModal={() => dispatch(openLoginModal())} />;
}
