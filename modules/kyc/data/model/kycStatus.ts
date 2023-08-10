import { KycStatus } from "@/core/enums/kyc.enums";
import { NextPage } from "@/core/enums/next-page.enums";
import { KycStatusInterface } from "./../../domain/entities/kyc";

function StatusMap(type: "unConfirmed" | "confirmed" | "rejected" | "pending") {
  switch (type) {
    case "confirmed":
      return KycStatus.Accepted;
    case "unConfirmed":
      return KycStatus.NotAccepted;
    case "rejected":
      return KycStatus.Rejected;
    default:
      return KycStatus.Pending;
  }
}
function NextPageMap(page: "home" | "deal" | "identityVerification") {
  switch (page) {
    case "identityVerification":
      return NextPage.IdentityVerification;
    case "deal":
      return NextPage.Deal;
    default:
      return NextPage.Home;
  }
}
export default function kycStatusModelMapper(
  data: any
): KycStatusInterface | undefined {
  if (!data) return;
  const {
    darkColor,
    description,
    hexDarkColor,
    hexLightColor,
    icon,
    lightColor,
    rules,
    title,
    type,
    nextPage,
    reason,
  } = data;
  return {
    title,
    description,
    icon,
    rules: rules
      ? {
          ruleTitle: rules.ruleTitle,
          ruleItems: rules.ruleItems,
        }
      : undefined,
    reason,
    status: StatusMap(type),
    nextPage: NextPageMap(nextPage),
    // type: "unConfirmed"
  };
}
