import {
  Alert,
  Button,
  ButtonBase,
  Fade,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./sell-address.module.scss";
import sectionStyles from "../../utils/purchasing-steps.module.scss";
import { DoubleBackwardIcon } from "@/core/components/common/custom-icon";
import clsx from "clsx";
import { SellStepsData } from "@/modules/order/domain/entities/order";
import QrCodeComponent from "@/core/components/common/qr-code";
import { Check as CheckIcon, QrCode } from "@mui/icons-material";
import AppDialogComponent from "@/core/components/common/app-dialog";
import { useCopyToClipboard } from "@/core/hooks";
import { useState } from "react";
import LoadingButton from "@/core/components/common/loading-button";
import TRUST from "@/public/icons/trust.svg";
import Image from "next/image";
import Link from "next/link";

type PropTypes = {
  handleNext: () => void;
  handlePrev: () => void;
  data: SellStepsData;
  qrModalOpen: boolean;
  closeQrModal: () => void;
  openQrModal: (isTag: boolean) => void;
  isTagQr: boolean;
  isMobile: boolean;
};
export default function SellAddressView(props: PropTypes) {
  const {
    handlePrev,
    handleNext,
    data,
    qrModalOpen,
    closeQrModal,
    openQrModal,
    isTagQr,
    isMobile,
  } = props;
  const hasTag = Boolean(data.depositAddress.tag);
  return (
    <section className={styles.root}>
      <Typography
        component="h2"
        className={clsx(sectionStyles.stepTitle, "mobile-down")}
      >
        گام سوم: ارسال ارز به کیف پول کریپو
      </Typography>
      <Paper className={sectionStyles.paper}>
        <Typography
          component="h2"
          className={clsx(sectionStyles.stepTitle, "mobile-up")}
        >
          <span className={sectionStyles.stepPart}>گام سوم:</span> ارسال ارز به
          کیف پول کریپو تسویه
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          مقدار {data.currency.faName} خود را به آدرس زیر ارسال نمایید.
        </Typography>
        <div className={styles.centerContent}>
          {data.deepLinks.trustWallet ? (
            <Link href={data.deepLinks.trustWallet}>
              <ButtonBase
                component="div"
                className={clsx({
                  [styles.trustBtn]: true,
                  [styles.hidden]: !isMobile,
                })}
              >
                <div>
                  <Typography className={styles.btnTitle}>
                    ارسال ارز با
                  </Typography>
                  <Typography className={styles.btnSubtitle}>
                    TRUST WALLET
                  </Typography>
                </div>
                <div className={styles.logoWrapper}>
                  <Image src={TRUST} width={35} height={35} />
                </div>
              </ButtonBase>
            </Link>
          ) : undefined}
          <div>
            <div className={styles.qrWrapper}>
              {!hasTag && Boolean(data.depositAddress.address) && (
                <QrCodeComponent value={data.depositAddress.address} />
              )}
            </div>
            <Typography className={styles.title}>آدرس {} کریپو</Typography>

            <AddressRow
              hasQr={hasTag}
              onQrClick={() => openQrModal(false)}
              value={data.depositAddress.address}
            />
            {hasTag && (
              <>
                <Typography className={styles.title}>
                  تگ یا مموی {} کریپو
                </Typography>

                <AddressRow
                  hasQr={hasTag}
                  onQrClick={() => openQrModal(true)}
                  value={data.depositAddress.tag}
                />
              </>
            )}
          </div>
        </div>
        {hasTag && (
          <Alert severity="info" sx={{ mt: 1, mb: { sm: 2 } }} icon={false}>
            <Typography>
              آدرس و تگ یا ممو هر دو با هم اجباری است. در صورت وارد نکردن تگ یا
              ممو، کریپو هیچگونه مسئولیتی در قبال فروش ارز کاربر نخواهد داشت.
            </Typography>
          </Alert>
        )}
        <AppDialogComponent
          open={qrModalOpen}
          onClose={closeQrModal}
          mobileStyle={4}
          className={styles.modal}
        >
          {isTagQr ? (
            <>
              <QrCodeComponent value={data.depositAddress.tag!} />
              <Typography className={styles.title}>
                تگ یا مموی {} کریپو
              </Typography>
              <AddressRow value={data.depositAddress.tag} />
            </>
          ) : (
            <>
              {Boolean(data.depositAddress.address) && (
                <QrCodeComponent value={data.depositAddress.address} />
              )}
              <Typography className={styles.title}>آدرس {} کریپو</Typography>
              <AddressRow value={data.depositAddress.address} />
            </>
          )}
        </AppDialogComponent>

        <Paper className={sectionStyles.footer}>
          <Button
            onClick={handlePrev}
            variant="outlined"
            startIcon={<DoubleBackwardIcon className={styles.buttonIcon} />}
          >
            بازگشت
          </Button>
          <LoadingButton onClick={handleNext} variant="contained">
            ثبت نهایی سفارش
          </LoadingButton>
        </Paper>
      </Paper>
    </section>
  );
}
function AddressRow({ hasQr, onQrClick, value }: any) {
  const [check, setCheck] = useState(false);
  const copyToClipboard = useCopyToClipboard(() => {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 2000);
  });
  return (
    <div className={styles.addressRow}>
      <ButtonBase
        className={styles.copyBtn}
        onClick={() => copyToClipboard(value)}
      >
        <Fade in={!check}>
          <Typography component="span">کپی</Typography>
        </Fade>
        <Fade in={check}>
          <div className={styles.checkIcon}>
            <CheckIcon color="primary" />
          </div>
        </Fade>
      </ButtonBase>
      <Typography className={clsx(styles.value, "en")}>{value}</Typography>
      {hasQr && (
        <ButtonBase onClick={onQrClick}>
          <QrCode />
        </ButtonBase>
      )}
    </div>
  );
}
