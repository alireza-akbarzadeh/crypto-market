import { useEffect } from "react";
import useKycStatus from "../../domain/usecases/useKycStatus";
import { NextPage } from "@/core/enums/next-page.enums";
import { useRouter } from "next/router";

export default function useKycAuth() {
  const router = useRouter();
  const { data } = useKycStatus();

  useEffect(() => {
    if (data?.nextPage && data.nextPage !== NextPage.IdentityVerification) {
      router.replace("/");
    }
  }, [data?.nextPage]);
}
