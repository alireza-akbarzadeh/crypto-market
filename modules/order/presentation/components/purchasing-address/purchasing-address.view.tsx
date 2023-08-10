import styles from "../../utils/purchasing-steps.module.scss";
import {
  Typography,
  Button,
  Paper,
  Stack,
  List,
  Alert,
  AlertTitle,
  FormHelperText,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import WalletAddressCardSelectableComponent from "@/modules/profile/presentation/components/wallet-address-card-selectable";
import { DoubleBackwardIcon } from "@/core/components/common/custom-icon";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import clsx from "clsx";
import LoadingComponent from "@/core/components/common/loading";

type PropTypes = {
  user?: UserInterface;
  selectAddress: (id: WalletAddressInterface) => void;
  selected?: WalletAddressInterface;
  openAddressModal: () => void;
  data: WalletAddressInterface[];
  handleNext: () => void;
  handlePrev: () => void;
  dirty: boolean;
  loading: boolean;
};
export default function PurchasingAddressView(props: PropTypes) {
  const {
    user,
    selectAddress,
    selected,
    openAddressModal,
    data,
    handleNext,
    handlePrev,
    dirty,
    loading,
  } = props;

  return (
    <section>
      <Typography
        component="h2"
        className={clsx(styles.stepTitle, "mobile-down")}
      >
        گام دوم: انتخاب آدرس ارزی
      </Typography>
      <Paper className={styles.paper}>
        <Typography
          component="h2"
          className={clsx(styles.stepTitle, "mobile-up")}
        >
          <span className={styles.stepPart}>گام دوم:</span> انتخاب آدرس ارزی
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <Typography component="span" fontWeight={600}>
            {user?.firstName}
          </Typography>{" "}
          عزیز، آدرس ارزی خود را انتخاب کنید:
        </Typography>

        {dirty && !selected && (
          <FormHelperText
            className="mobile-down"
            error
            sx={{ display: "flex", mt: -0.5, mb: 1 }}
          >
            <ErrorOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
            لطفا یک آدرس ارزی انتخاب کنید.
          </FormHelperText>
        )}
        {/* <Alert severity="info" sx={{ mt: 1, mb: 2 }} icon={<TimerIcon />}>
          <AlertTitle>زمان ارسال ارز</AlertTitle>
          ۱۵ دقیقه بعد از ثبت سفارش
        </Alert> */}

        <Button
          onClick={openAddressModal}
          variant="dashed"
          // startIcon={<AddIcon />}
          className={styles.addButton}
        >
          افزودن آدرس ارزی جدید
        </Button>

        <List className={styles.list}>
          {data.map((data) => (
            <WalletAddressCardSelectableComponent
              key={data.id}
              data={data}
              onSelect={() => selectAddress(data)}
              selected={selected?.id === data.id}
            />
          ))}
          {loading && <LoadingComponent />}

          {dirty && !selected && (
            <FormHelperText
              className="mobile-up"
              error
              sx={{ display: "flex" }}
            >
              <ErrorOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
              لطفا یک آدرس ارزی انتخاب کنید.
            </FormHelperText>
          )}
        </List>
        <Paper className={styles.footer}>
          <Button
            onClick={handlePrev}
            variant="outlined"
            startIcon={<DoubleBackwardIcon className={styles.buttonIcon} />}
          >
            مرحله قبل
          </Button>
          <Button onClick={handleNext} variant="contained">
            {data.length ? "تایید" : "ثبت آدرس ارزی"}
          </Button>
        </Paper>
      </Paper>
    </section>
  );
}
