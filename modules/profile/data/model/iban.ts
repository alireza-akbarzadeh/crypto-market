import { IbanStatus } from "./../../../../core/enums/profile.enums";

const IbanStatusMap = {
  pending: IbanStatus.Pending,
  confirmed: IbanStatus.Accepted,
  unConfirmed: IbanStatus.NotAccepted,
} as any;

export default function ibanModelMapper(iban: any) {
  const { id, bank, number, status } = iban;
  return {
    image: bank.icon,
    origin: bank.name,
    alert: bank.alert,
    id,
    iban: "IR" + number,
    status: IbanStatusMap[status],
  };
}
