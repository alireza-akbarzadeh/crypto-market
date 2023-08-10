import useKycAuth from "../../hooks/useKycAuth";
import KycSelectIdentityView from "./kyc-select-identity.view";

type PropTypes = {};
export default function KycSelectIdentityPage(props: PropTypes) {
  useKycAuth();

  return <KycSelectIdentityView />;
}
