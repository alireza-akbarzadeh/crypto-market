import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import { useUserIbanListDS } from "../../data/datasources/profile.datasource";
import ibanModelMapper from "../../data/model/iban";
import { DefaultFetchConfig } from "@/core/constants/types";
import { IbanStatus } from "@/core/enums/profile.enums";

export default function useUserIbanList(
  accepted?: boolean,
  config?: DefaultFetchConfig
) {
  const { data, error, mutate, isValidating } = useUserIbanListDS(
    accepted,
    config
  );

  const _data: IbanInterface[] = !data?.result?.items
    ? []
    : data.result.items.map(ibanModelMapper);
  return {
    data: _data,
    loading: (!error && !data) || isValidating,
    error,
    mutate,
  };
}
