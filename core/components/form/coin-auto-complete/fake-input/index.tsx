import { WalletAddressCoinInterface } from "@/modules/wallet/domain/entities/coin";
import { LegacyRef } from "react";
import FakeInputView from "./fake-input.view";

type PropTypes = {
  coin: WalletAddressCoinInterface;
  inputRef: LegacyRef<HTMLInputElement>;
  className: string;
  onMouseDown: any;
};
export default function FakeInputComponent(props: PropTypes) {
  const { inputRef, className, coin, onMouseDown } = props;
  return <FakeInputView {...{ inputRef, className, coin, onMouseDown }} />;
}
