import WalletDepositView from "./wallet-deposit.view";
import * as Yup from "yup";
import yupSchema from "@/core/helpers/yupSchema";
import { BankCardInterface } from "@/modules/profile/domain/entities/bank-card";
import { WalletDepositFormValues } from "@/modules/wallet/domain/entities/form-values";
import { depositRequest } from "@/modules/wallet/domain/usecases/depositRequest";
import { useDispatch, useErrorHandler } from "@/core/hooks";
import { useRouter } from "next/router";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openUserInfoModal } from "@/modules/profile/presentation/redux";

const schema = Yup.object().shape({
  amount: yupSchema.money,
  card: yupSchema.card,
});

type PropTypes = {
  cards?: BankCardInterface[];
};
export default function WalletDepositComponent(props: PropTypes) {
  const { cards } = props;
  const router = useRouter();
  const errorHandler = useErrorHandler();
  const { user } = useUser();
  const dispatch = useDispatch();

  const onSubmit = async (model: WalletDepositFormValues) => {
    const { data, error } = await depositRequest(model);
    if (error) {
      errorHandler(error);
      return;
    }
    router.replace(data);
  };

  const openUpdateProfile = () => {
    dispatch(openUserInfoModal(undefined));
  };

  return (
    <WalletDepositView
      {...{ onSubmit, cards, schema, user, openUpdateProfile }}
    />
  );
}
