import useUser from "@/modules/auth/domain/usecases/useUser";
import { FormikHelpers } from "formik";
import PaymentConfirmModalView from "./payment-confirm-modal.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { WalletBalanceInterface } from "@/modules/wallet/domain/entities/wallet";
import purchasePayment from "@/modules/order/domain/usecases/purchasePayment";
import { useEffect, useMemo } from "react";
import { PurchasePaymentResult } from "@/modules/order/domain/entities/payment";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  data?: PurchasePaymentResult;
};
export default function PaymentConfirmModalComponent(props: PropTypes) {
  const { open, onClose, onSubmit, data } = props;
  const { user } = useUser();

  const schema = useMemo(() => {
    Yup.object().shape(
      data?.otp
        ? {
            code: yupSchema.code,
          }
        : {}
    );
  }, [data?.otp]);
  return (
    <PaymentConfirmModalView
      {...{ open, onClose, schema, onSubmit, user: user!, data }}
    />
  );
}
