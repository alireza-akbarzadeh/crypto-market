import { useEffect, useMemo, useState } from "react";
import { useIsMounted, useSelector } from "@/core/hooks";
import { useUserDS } from "../../data/datasources/auth.datasource";
import { DefaultFetchConfig } from "@/core/constants/types";
import { UserInterface } from "../entities/user";

export default function useUser(config?: DefaultFetchConfig) {
  const { token } = useSelector((state) => state.auth);
  const mounted = useIsMounted();
  const [user, setUser] = useState<UserInterface>();
  const { data, error, mutate, isValidating } = useUserDS(config);
  const {
    firstName,
    lastName,
    fullName,
    fatherName,
    phone,
    nationalCode,
    birthday,
    avatar,
    kycSim,
    star,
    joinAt,
  } = data?.result || {};

  useEffect(() => {
    if (!data || !token) {
      setUser(undefined);
      return;
    }

    const u = {
      firstName,
      lastName,
      fullName,
      phoneNumber: phone,
      fatherName: fatherName || undefined,
      birthDate: birthday || undefined,
      nationalCode: nationalCode || undefined,
      rate: star / 20,
      avatar: avatar?.src,
      avatarId: `${avatar?.id}`,
      kycSim: kycSim,
      joinedAt: joinAt,
    };
    setUser(u);

    localStorage.setItem("user", JSON.stringify(u));
  }, [data, token]);

  return {
    userLoading: Boolean(!mounted || (token && !data && !error)),
    loggedOut: error && error.status === 403,
    user,
    mutate,
  };
}
/**
 * active: false
avatar_id: null
birthday: null
bitgap_writer: false
buy_permission: true
confirm_sim_ownership: false
confirm_sim_ownership_response: null
created_at: "2021-11-17T11:31:24.000000Z"
deal_version: "1"
deleted_at: null
deposit: false
discuss_permission: true
father_name: null
first_name: "مهران"
id: 549435
instant_checkout: "0"
kyc: "unconfirmed"
kyc_activity: null
kyc_admin_id: null
kyc_attempt: 0
kyc_date: null
kyc_document: false
kyc_identity: false
kyc_sim: false
last_name: "شوقی"
national_camera: "back"
national_card_response: null
national_code: null
national_note: null
note: null
notification_reads: null
open_forms: ["sim", "selfie", "national"]
otp: false
phone: "09121234567"
read_discuss_rule: false
real_phone: "09121234567"
reference: null
review: ""
secret: "09121234567"
selfie_camera: "front"
selfie_note: null
sell_permission: true
speech_confirm: false
status: "active"
sub_account_id: null
tag_permission: false
updated_at: "2021-11-17T11:31:49.000000Z"
upload: false
withdraw: false
 */
