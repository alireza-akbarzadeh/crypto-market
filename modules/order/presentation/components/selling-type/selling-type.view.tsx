import {
  Button,
  Paper,
  ButtonBase,
  Typography,
  FormHelperText,
  Alert,
  AlertTitle,
} from "@mui/material";
import styles from "./selling-type.module.scss";
import TimerIcon from "@mui/icons-material/Timer";
import sectionStyles from "../../utils/purchasing-steps.module.scss";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { SellType } from "@/core/enums/order.enums";
// import { ChangeEvent } from "react";
import { currencyFormat } from "@/core/helpers";
import { DoubleForwardIcon } from "@/core/components/common/custom-icon";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SelectIbanModalComponent from "../select-iban-modal";
import clsx from "clsx";
import WalletIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
// import IbanIcon from "@mui/icons-material/LibraryBooksTwoTone";
import { SellStepsData } from "@/modules/order/domain/entities/order";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";

type PropTypes = {
  handlePrev: () => void;
  handleNext: () => void;
  user?: UserInterface;
  selected?: SellType;
  handleSelect: (value: SellType) => void;
  dirty: boolean;
  selectIbanOpen: boolean;
  closeSelectIban: () => void;
  data?: SellStepsData;
  onIbanSelect: (iban: IbanInterface) => void;
  selectedIban?: IbanInterface;
};

export default function SellingTypeView(props: PropTypes) {
  const {
    handleNext,
    handlePrev,
    user,
    selected,
    handleSelect,
    dirty,
    selectIbanOpen,
    closeSelectIban,
    data,
    onIbanSelect,
    selectedIban,
  } = props;
  return (
    <section>
      <Typography
        component="h2"
        className={clsx(sectionStyles.stepTitle, "mobile-down")}
      >
        گام دوم: انتخاب روش تسویه
      </Typography>
      <Paper className={sectionStyles.paper}>
        <Typography
          component="h2"
          className={clsx(sectionStyles.stepTitle, "mobile-up")}
        >
          <span className={sectionStyles.stepPart}>گام دوم:</span> انتخاب روش
          تسویه
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <Typography component="span" fontWeight={600}>
            {user?.firstName}
          </Typography>{" "}
          عزیز، لطفا روش تسویه خود را انتخاب کنید.
        </Typography>

        <Alert severity="info" sx={{ mt: 1, mb: 2 }} icon={<TimerIcon />}>
          <AlertTitle>{data?.checkoutTimes.title}</AlertTitle>
          {data?.checkoutTimes.items.map(({ name, value }) => (
            <Typography key={name}>
              <Typography component="span" fontWeight={500}>
                {name}:{" "}
              </Typography>
              {value}
            </Typography>
          ))}
        </Alert>

        <ButtonBase
          component="div"
          className={clsx({
            [styles.cardButton]: true,
            [styles.selected]: selected === SellType.Wallet,
          })}
          onClick={() => {
            handleSelect(SellType.Wallet);
          }}
        >
          <WalletIcon className={styles.icon} />
          <div className={styles.info}>
            <Typography className={styles.title} component="div">
              واریز به کیف پول <span className={styles.badge}>واریز آنی</span>
            </Typography>
            <Typography className={styles.subTitle} component="div">
              موجودی <span>{currencyFormat(data?.balance.available)}</span>{" "}
              تومان
            </Typography>
          </div>
        </ButtonBase>
        {/* <ButtonBase
          component="div"
          className={clsx({
            [styles.cardButton]: true,
            [styles.selected]: selected === SellType.Iban,
          })}
          onClick={() => handleSelect(SellType.Iban)}
        >
          <IbanIcon className={styles.icon} />
          <div className={styles.info}>
            <Typography className={styles.title} component="div">
              واریز به شبای بانکی
            </Typography>
            <Typography className={styles.subTitle} component="div">
              {selectedIban
                ? splitString(selectedIban.iban, 4, " ")
                : "امکان واریز به تمامی شباهای بانکی"}
            </Typography>
          </div>
          <Button className={styles.changeBtn} variant="outlined" size="small">
            تغییر شبا
          </Button>
        </ButtonBase> */}
        <FormHelperText
          error
          sx={{ opacity: dirty && !selected ? 1 : 0, display: "flex", mb: 2 }}
        >
          <ErrorOutlineIcon fontSize="small" /> لطفا یک روش تسویه انتخاب کنید.
        </FormHelperText>
        <SelectIbanModalComponent
          open={selectIbanOpen}
          onSelect={onIbanSelect}
          onClose={closeSelectIban}
          selected={selectedIban}
        />
        <Paper className={sectionStyles.footer}>
          <Button onClick={handlePrev} variant="outlined">
            بازگشت
          </Button>
          <Button
            endIcon={<DoubleForwardIcon className={sectionStyles.buttonIcon} />}
            onClick={handleNext}
            variant="contained"
          >
            مرحله بعد
          </Button>
        </Paper>
      </Paper>
    </section>
  );
}
