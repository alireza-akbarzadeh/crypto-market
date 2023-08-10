import { GetPaginateHookType } from "./../../../../core/hooks/usePaginateHelpers";
import { WalletAddressInterface } from "./../../../profile/domain/entities/wallet-address";

import { useWalletAddressListDS } from "../../data/datasources/wallet.datasource";
import walletAddressModelMapper from "../../data/model/walletAddress";

const useWalletAddressList: GetPaginateHookType<WalletAddressInterface> =
  () => {
    const { rows, meta, mutate, isLoading, size, setSize } =
      useWalletAddressListDS<WalletAddressInterface>(walletAddressModelMapper);

    return {
      rows,
      meta,
      size,
      setSize,
      isLoading,
      mutate,
    };
  };
export default useWalletAddressList;
