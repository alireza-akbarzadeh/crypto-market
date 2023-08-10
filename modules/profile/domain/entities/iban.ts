import { IbanStatus } from "@/core/enums/profile.enums";

export interface IbanInterface {
  id: string;
  image: string;
  origin: string;
  iban: string;
  status: IbanStatus;
  alert?: string;
}

export interface IbanInquiry {
  ibanNumber: string;
  name: string;
  trackId: string;
  origin: string;
}
