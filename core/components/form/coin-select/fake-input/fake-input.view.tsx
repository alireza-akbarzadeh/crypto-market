import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { Typography } from "@mui/material";
import clsx from "clsx";
import { LegacyRef } from "react";
import Image from "next/image";
import styles from "./fake-input.module.scss";

type PropTypes = {
  coin?: CoinDataInterface;
  inputRef: LegacyRef<HTMLInputElement>;
  className: string;
};
export default function FakeInputView(props: PropTypes) {
  const { coin, inputRef, className } = props;
  const { shortName, faName, icon } = coin || {
    shortName: "BTC",
    faName: "بیت کوین",
    icon: "https://api.cryoto.com/static/coins/BTC.png",
  };

  return (
    <div className={clsx(className, styles.fakeInput, styles.important)}>
      <input type="text" ref={inputRef} hidden />
      <Image src={icon} alt={shortName} width={20} height={20} />
      <Typography className={styles.name} variant="body2">
        {faName}
        <Typography
          component="span"
          sx={{ display: { sm: "inline", xs: "none" } }}
        >
          {" "}
          ({shortName})
        </Typography>
      </Typography>
    </div>
  );
}
