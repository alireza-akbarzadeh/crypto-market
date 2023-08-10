import { TransactionStatus } from "./../../../../core/enums/transaction.enums";
import { TransactionType } from "@/core/enums/transaction.enums";
import { TransactionInterface } from "@/modules/wallet/domain/entities/transaction";
import { ColorVariant } from "@/core/enums/theme.enums";

const TypeMap: any = {
  withdraw: TransactionType.Withdraw,
  deposit: TransactionType.Deposit,
};
const StatusMap: any = {
  un_confirm: TransactionStatus.Waiting,
};
const variantMap: any = {
  info: ColorVariant.Primary,
  danger: ColorVariant.Error,
  warning: ColorVariant.Warning,
  success: ColorVariant.Success,
};

export default function transactionModelMapper(
  data: any
): TransactionInterface {
  const {
    id,
    amount,
    balance,
    side,
    status,
    statusTitle,
    description,
    checkoutAt,
    createdAt,
    transactionId,
    variant,
  } = data;
  return {
    id,
    value: amount,
    type: TypeMap[side],
    balance,
    status: StatusMap[status],
    statusTitle,
    description,
    createdAt: {
      date: createdAt.date,
      time: createdAt.time,
    },
    checkoutDate: checkoutAt,
    transactionNumber: transactionId,
    variant: variantMap[variant],
  };
}
