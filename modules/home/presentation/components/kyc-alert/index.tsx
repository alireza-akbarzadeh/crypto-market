import KycAlertView from "./kyc-alert.view";
import useAppInitials from "@/modules/_app/domain/usecases/useAppInitials";

type PropTypes = {};
export default function KycAlertComponent(props: PropTypes) {
  const { data: appInitials } = useAppInitials();
  return <KycAlertView kycShortcut={appInitials?.kycShortcut} />;
}
