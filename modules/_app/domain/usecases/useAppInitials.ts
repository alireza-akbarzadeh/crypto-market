import { useMemo } from "react";
import { useAppInitialsDS } from "../../data/datasources/app.datasource";
import appInitialsModelMapper from "../../data/model/appInitials";
import { DefaultFetchConfig } from "./../../../../core/constants/types";
export default function useAppInitials(config?: DefaultFetchConfig) {
  const { data, error, isValidating, mutate } = useAppInitialsDS(config);

  const _data = useMemo(() => {
    const d = appInitialsModelMapper(data?.result);
    if (d) {
      if (d.logo) {
        localStorage.setItem("logo", JSON.stringify(d.logo));
      } else {
        localStorage.removeItem("logo");
      }
    }
    return d;
  }, [data]);

  return {
    data: _data,
    error: data?.error || error,
    isValidating,
    mutate,
  };
}
