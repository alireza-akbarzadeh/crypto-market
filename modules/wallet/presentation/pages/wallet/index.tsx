import useWallet from "@/modules/wallet/domain/usecases/useWallet";
import { useState } from "react";
import WalletView, { WalletState } from "./wallet.view";

type PropTypes = {};
export default function WalletPage(props: PropTypes) {
  const [state, setState] = useState<WalletState>(WalletState.Deposit);
  const { data } = useWallet();

  return <WalletView {...{ state, setState: (s) => setState(s), ...data }} />;
}
