import { KycStatus } from "@/core/enums/kyc.enums";
import { NextPage } from "@/core/enums/next-page.enums";
import { ResponseDialog } from "@/core/http";

export interface KycStatusInterface {
  title: string;
  description: string;
  icon: string;
  rules?: { ruleTitle: string; ruleItems: string[] };
  status: KycStatus;
  nextPage: NextPage;
  reason?: ResponseDialog;
}
