import styles from "./wallet.module.scss";
import React from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  ButtonBase,
  Skeleton,
} from "@mui/material";
import { currencyFormat } from "@/core/helpers";
import WalletDepositComponent from "../../components/wallet-deposit";
import WalletWithdrawComponent from "../../components/wallet-withdraw";
import WalletHistoryComponent from "../../components/wallet-history";
import clsx from "clsx";
import WithdrawIcon from "@mui/icons-material/DownloadTwoTone";
import DepositIcon from "@mui/icons-material/UploadTwoTone";
import HistoryIcon from "@mui/icons-material/History";
import WalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import { BankCardInterface } from "@/modules/profile/domain/entities/bank-card";
import { WalletBalanceInterface } from "@/modules/wallet/domain/entities/wallet";
import AppBottomNavComponent from "@/core/components/layouts/app-bottom-nav";
import BalanceBoxComponent from "../../components/balance-box";

export enum WalletState {
  Deposit,
  Withdraw,
  History,
}

type PropTypes = {
  state: WalletState;
  setState: (state: WalletState) => void;
  ibans?: IbanInterface[];
  cards?: BankCardInterface[];
  balance?: WalletBalanceInterface;
};
export default function WalletView(props: PropTypes) {
  const { state, setState, ibans, cards, balance } = props;
  return (
    <>
      <div className={styles.content}>
        <div className="desktop-down">
          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ my: 1 }}
          >
            {/* <Toolbar /> */}
            {balance ? (
              <BalanceBoxComponent className={styles.balanceBox}>
                <Typography component="div" className={styles.title}>
                  کیف پول ریالی
                </Typography>
                <Typography component="div" variant="body2">
                  موجودی
                </Typography>
                <Typography className={styles.value} component="div">
                  {currencyFormat(balance?.available)}{" "}
                  <Typography component="span">تومان</Typography>
                </Typography>
              </BalanceBoxComponent>
            ) : (
              <Skeleton variant="text" width={120} sx={{ mx: "auto" }} />
            )}
          </Typography>
          <ToggleButtonGroup
            color="standard"
            fullWidth
            value={state}
            exclusive
            onChange={(_, val) => setState(val !== null ? val : state)}
            size="small"
            sx={{ my: 3 }}
          >
            <ToggleButton value={WalletState.Deposit}>
              افزایش موجودی
            </ToggleButton>
            <ToggleButton value={WalletState.Withdraw}>برداشت وجه</ToggleButton>
            <ToggleButton value={WalletState.History}>تاریخچه</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={clsx("desktop-up", styles.desktopTop)}>
          <div className={styles.cash}>
            <WalletTwoToneIcon className={styles.icon} />
            <div>
              <Typography fontWeight={600} color="text.secondary">
                موجودی
              </Typography>
              <Typography
                className={styles.value}
                align="center"
                component="div"
              >
                {/* {balance ? (
                <Typography component="span" fontWeight={700} variant="h6">
                  {currencyFormat(balance?.available)} تومان
                </Typography>
              ) : (
                <Skeleton variant="text" width={100} />
              )} */}
                <Typography component="span" fontWeight={700} variant="h6">
                  {balance ? (
                    <>
                      {currencyFormat(balance?.available)}{" "}
                      <Typography component="span">تومان</Typography>
                    </>
                  ) : (
                    <Skeleton variant="text" width={100} />
                  )}
                </Typography>
              </Typography>
            </div>
          </div>
          <div className={styles.tabs}>
            <SelectButton
              onClick={() => setState(WalletState.Deposit)}
              selected={state === WalletState.Deposit}
              icon={DepositIcon}
            >
              افزایش موجودی
            </SelectButton>
            <SelectButton
              onClick={() => setState(WalletState.Withdraw)}
              selected={state === WalletState.Withdraw}
              icon={WithdrawIcon}
            >
              برداشت وجه
            </SelectButton>
            <SelectButton
              onClick={() => setState(WalletState.History)}
              selected={state === WalletState.History}
              icon={HistoryIcon}
            >
              تاریخچه
            </SelectButton>
          </div>
        </div>
        <div className={styles.scrollableContent}>
          {state === WalletState.Deposit && (
            <WalletDepositComponent cards={cards} />
          )}
          {state === WalletState.Withdraw && (
            <WalletWithdrawComponent
              ibans={ibans}
              openHistory={() => setState(WalletState.History)}
            />
          )}
          {state === WalletState.History && <WalletHistoryComponent />}
        </div>
      </div>
      <AppBottomNavComponent />
    </>
  );
}

function SelectButton(props: any) {
  const { selected, children, icon: Icon, ...other } = props;
  return (
    <ButtonBase
      className={clsx({
        [styles.tabItem]: true,
        [styles.selected]: selected,
      })}
      {...other}
    >
      <Icon className={styles.icon} />
      <Typography fontWeight={600} component="span">
        {children}
      </Typography>
    </ButtonBase>
  );
}
