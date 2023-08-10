import { useRouter } from "next/router";
import KycNationalCardSerialView from "./kyc-national-card-serial.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { useErrorHandler } from "@/core/hooks";
import kycNationalCardSerialNumber from "@/modules/kyc/domain/usecases/kycNationalCardSerialNumber";
import useKycAuth from "../../hooks/useKycAuth";

const schema = Yup.object().shape({
  code: yupSchema.nationalCardSerial,
});

type PropTypes = {};
export default function KycNationalCardSerialPage(props: PropTypes) {
  const router = useRouter();
  const errorHandler = useErrorHandler();
  useKycAuth();

  const onSubmit = async (values: any) => {
    const { error } = await kycNationalCardSerialNumber(values.code);

    if (error) {
      errorHandler(error);
      return;
    }
    // mutate();
    router.push("/kyc/video");
  };
  return (
    <KycNationalCardSerialView
      hasCard={!router.query.missed}
      schema={schema}
      onSubmit={onSubmit}
    />
  );
}
