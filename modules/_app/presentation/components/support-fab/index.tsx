import { useDispatch, useIsMobileSize } from "@/core/hooks";
import SupportFabView from "./support-fab.view";
import { openSupport } from "@/modules/support/presentation/redux";
import { useRouter } from "next/router";

type PropTypes = {};
export default function SupportFabComponent(props: PropTypes) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = () => {
    dispatch(openSupport(undefined));
  };
  if (router.query.application) return null;
  return <SupportFabView onClick={onClick} />;
}
