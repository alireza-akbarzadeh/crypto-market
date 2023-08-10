import { useRedirectNotUser, useDispatch, useErrorDialog } from "@/core/hooks";
import useKycStatus from "@/modules/kyc/domain/usecases/useKycStatus";
import { useRouter } from "next/router";
import KycStatusView from "./kyc-status.view";
import { NextPage } from "@/core/enums/next-page.enums";
import { openAlert } from "@/modules/_app/presentation/redux";
import UAParser from "ua-parser-js";
import { useEffect } from "react";

type PropTypes = {};
export default function KycStatusPage(props: PropTypes) {
  const { data } = useKycStatus();
  const router = useRouter();
  const dispatch = useDispatch();
  const errorDialog = useErrorDialog();

  useRedirectNotUser();
  useEffect(() => {
    if (!data?.reason) return;
    errorDialog(data.reason);
  }, [data?.reason]);

  const handleAction = () => {
    if (data?.nextPage !== NextPage.IdentityVerification) {
      router.push("/");
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      const ua = new UAParser().getResult();
      // console.log(ua);
      let isConfigurableIos = false;
      if (ua.os.name?.toLowerCase() === "ios" && ua.os.version) {
        let [a, b = 0] = ua.os.version.split(".");
        if (+`${a}.${b}` >= 12.2) {
          isConfigurableIos = true;
        }
      }

      dispatch(
        openAlert({
          title: "مرورگر شما از دوربین پشتیبانی نمیکند",
          message: isConfigurableIos
            ? "<p>لطفا برای رفع خطا مراحل زیر را طی کنید:</p><ul> <li>به قسمت settings بروید.</li> <li>Safari را انتخاب کنید.</li> <li>در انتهای لیست گزینه‌ی Advanced را انتخاب کنید.</li> <li>وارد منو Experimental Features شوید.</li> <li>گزینه‌ی MediaRecorder را روشن کنید.</li> <li>با مرورگر سافاری دوباره اقدام کنید.</li> <li>مرورگر خود را رفرش کنید.</li> </ul>"
            : "<p>لطفا با دستگاه دیگری مجددا تلاش کنید.</p>",
          variant: "error",
          htmlMessage: true,
          actionButtons: [
            isConfigurableIos
              ? { title: "متوجه شدم" }
              : {
                  title: "بازگشت به خانه",
                  handler: (close: any) => {
                    close();
                    router.push("/");
                  },
                },
          ],
        })
      );
      return;
    }
    router.push("/kyc/select-id");
  };
  return <KycStatusView {...{ data, handleAction }} />;
}
