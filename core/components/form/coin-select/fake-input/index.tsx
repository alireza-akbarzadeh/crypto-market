import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { LegacyRef } from "react";
import FakeInputView from "./fake-input.view";

type PropTypes = {
  coin?: CoinDataInterface;
  inputRef: LegacyRef<HTMLInputElement>;
  className: string;
};
export default function FakeInputComponent(props: PropTypes) {
  const { inputRef, className, coin } = props;
  return <FakeInputView {...{ inputRef, className, coin }} />;
}
