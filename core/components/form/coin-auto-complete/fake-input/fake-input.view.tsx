import { Typography } from "@mui/material";
import clsx from "clsx";
import { LegacyRef } from "react";
import Image from "next/image";
import styles from "./fake-input.module.scss";
import { WalletAddressCoinInterface } from "@/modules/wallet/domain/entities/coin";

type PropTypes = {
  coin: WalletAddressCoinInterface;
  inputRef: LegacyRef<HTMLInputElement>;
  className: string;
  onMouseDown: any;
};
export default function FakeInputView(props: PropTypes) {
  const { coin, inputRef, className, onMouseDown } = props;
  const { shortName, faName, icon } = coin;

  return (
    <label
      onMouseDown={onMouseDown}
      className={clsx(className, styles.fakeInput, styles.important)}
    >
      <input type="text" ref={inputRef} hidden />
      <Image src={icon} alt={shortName} width={20} height={20} />
      <Typography className={styles.name} variant="body2" component="span">
        {faName}
        <Typography
          component="span"
          sx={{ display: { sm: "inline", xs: "none" } }}
        ></Typography>
      </Typography>
    </label>
  );
}
