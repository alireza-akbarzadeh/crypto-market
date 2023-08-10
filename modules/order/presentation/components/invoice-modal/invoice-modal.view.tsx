import styles from "./invoice-modal.module.scss";
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  Alert,
  AlertTitle,
  FormHelperText,
  Fade,
  IconButton,
  Collapse,
} from "@mui/material";
import PriceLine from "../price-line";
import CustomTooltip from "@/core/components/common/custom-tooltip";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { OrderType } from "@/core/enums/order.enums";
import { BuyOrderRequestData } from "../../../domain/entities/order";
import ToggleButtonComponent from "@/core/components/form/toggle-button";
import AppDialogComponent from "@/core/components/common/app-dialog";
import { useIsMobileSize } from "@/core/hooks";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useMemo } from "react";

type PropTypes = {
  user?: UserInterface;
  onSubmit: () => void;
  onClose: () => void;
  openLoginModal: () => void;
  data: BuyOrderRequestData & { orderType: OrderType };
  open: boolean;
  dirty: boolean;
  // accept: boolean;
  // toggleAccept: () => void;
  setNetwork: (network: any) => void;
  network?: string;
  priceLoading: boolean;
};
export default function InvoiceModalView(props: PropTypes) {
  const {
    data,
    user,
    onSubmit,
    open,
    onClose,
    openLoginModal,
    // toggleAccept,
    // accept,
    dirty,
    setNetwork,
    network,
    priceLoading,
  } = props;
  const isMobileSize = useIsMobileSize();

  const isBuy = data?.orderType === OrderType.Buy;
  const note = useMemo(() => {
    if (!data || !network) return;
    const selectedNetwork = data.networks.find((n) => n.network === network);
    return isBuy ? selectedNetwork?.buyNote : selectedNetwork?.sellNote;
  }, [data]);

  const mainContent = () => {
    if (!data) return null;
    return (
      <Box data-cy="invoice-modal" className={styles.content}>
        <div className={styles.amount}>
          <div className={styles.name}>
            <div className={styles.image}>
              <Image src={data.currency.icon} width={20} height={20} />
            </div>
            <Typography component="div" color="text.secondary">
              {data.currency.faName}
            </Typography>
          </div>
          <Typography className={styles.value} component="div">
            {data.amount} <span>{data.currency.coin}</span>
          </Typography>
        </div>
        <Typography> شبکه ارز خود را انتخاب کنید:</Typography>
        {/* <CustomTooltip
          title={
            <Typography>
              شبکه ارز چیست؟ <br />
              هر ارز میتواند در قالب چندین شبکه ارائه شود، لازم به ذکر است نوع
              شبکه ها تاثیری در قیمت ارزها نخواهد داشت و صرفا در کارمزد و سرعت
              انتقال باهم تفاوت دارند. <br />
              توجه داشته باشید آدرس ارز در هر شبکه متفاوت خواهد بود.
            </Typography>
          }
        >
          شبکه ارز خود را انتخاب کنید:
        </CustomTooltip> */}
        <Grid container spacing={1} sx={{ mt: 0, mb: 2 }}>
          {data.networks.map((n) => (
            <Grid key={n.network} item xs={4}>
              <ToggleButtonComponent
                onClick={() => setNetwork(n)}
                selected={n.network === network}
                variant="containedLight"
                fullWidth
              >
                {n.name}
              </ToggleButtonComponent>
            </Grid>
          ))}
          {Boolean(dirty && !network) && (
            <Grid item xs={12}>
              <FormHelperText
                // className={styles.helperText}
                error
              >
                شبکه ارز خود را انتخاب کنید.
              </FormHelperText>
            </Grid>
          )}
        </Grid>
        {Boolean(note) && (
          <Alert severity="warning" icon={false} sx={{ mt: 2 }}>
            {note}
          </Alert>
        )}
        {data?.description ? (
          <Typography
            // className={styles.defaultMessage}
            sx={{ mt: 2 }}
            component="div"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        ) : null}
        {/* {Boolean(data.description) && (
          <Alert severity="warning" icon={false} sx={{ mt: 2 }}>
            {data.description}
          </Alert>
        )} */}
        <div className={styles.priceHolder}>
          {isBuy && (
            <Collapse in={!!network}>
              <div className={styles.feeBox}>
                <PriceLine loading={priceLoading} value={data.price}>
                  مبلغ درخواستی:
                </PriceLine>
                <PriceLine
                  loading={priceLoading}
                  value={data.networkFeeIrt}
                  // tooltip={
                  //   <Typography>
                  //     کارمزد شبکه چیست؟ <br />
                  //     کارمزد شبکه یا نرخ انتقال، هزینه ای است که برای انتقال
                  //     رمزارز به یک کیف پول می بایست به شبکه بلاکچین پرداخت کرد.
                  //   </Typography>
                  // }
                >
                  کارمزد شبکه:
                </PriceLine>
                <PriceLine
                  loading={priceLoading}
                  value={data.convertFee}
                  // tooltip={
                  //   <Typography>
                  //     کارمزد تبدیل، به میزان 0.125% از میزان پرداختی شماست که
                  //     زمان تبدیل مبلغ پرداختی شما به ارز انتخاب شده توسط صرافی
                  //     کسر می‌گردد.
                  //   </Typography>
                  // }
                >
                  کارمزد تبدیل:
                </PriceLine>
                {/* <PriceLine
                  loading={priceLoading}
                  value={data.gatewayFee}
                  tooltip={
                    <Typography>
                      کارمزد درگاه بانکی چیست؟ <br />
                      هزینه ای است که درگاه واسط بانکی به ازای هر خرید آنلاین از
                      کاربر دریافت میکند.
                    </Typography>
                  }
                >
                  کارمزد درگاه بانکی
                </PriceLine> */}
              </div>
            </Collapse>
          )}
        </div>
        {Boolean(!isBuy && data.checkoutTimes) && (
          <Alert className={styles.checkoutAlert} severity="info">
            <AlertTitle>{data.checkoutTimes!.title}</AlertTitle>
            {data.checkoutTimes!.items.map(({ name, value }) => (
              <div key={name}>
                <Typography component="span" fontWeight={500}>
                  {name}:{" "}
                </Typography>
                <Typography component="span">{value} </Typography>
              </div>
            ))}
          </Alert>
        )}
        {Boolean(isBuy && data.checkoutTime) && (
          <Alert className={styles.checkoutAlert} severity="info">
            <AlertTitle>زمان واریز ارز</AlertTitle>
            <Typography>{data.checkoutTime}</Typography>
          </Alert>
        )}
        <div className={styles.totalPriceBox}>
          <PriceLine
            loading={priceLoading}
            value={isBuy ? data.totalPrice : data.price}
            fontWeight={700}
          >
            {isBuy
              ? "مبلغی که پرداخت می‌کنید:"
              : " مبلغ تقریبی دریافتی:"}
          </PriceLine>
        </div>
        {/* {Boolean(data.checkoutTimes) && (
          <div className={styles.checkoutBox}>
            <Typography className={styles.checkoutTime}>
              {data.checkoutTimes!.title}
            </Typography>
            {data.checkoutTimes!.items.map(({ name, value }) => (
              <div>
                <Typography component="span">{name}: </Typography>
                <Typography component="span">{value} </Typography>
              </div>
            ))}
          </div>
        )} */}

        <div className={styles.buttonWrapper}>
          <Button
            className="mobile-up"
            onClick={onClose}
            color="primary"
            variant="outlined"
            fullWidth
          >
            ویرایش
          </Button>
          {user ? (
            <Button
              onClick={onSubmit}
              color="primary"
              variant="contained"
              fullWidth
            >
              ادامه
            </Button>
          ) : (
            <Button
              onClick={openLoginModal}
              color="primary"
              variant="contained"
              fullWidth
            >
              ورود به حساب کاربری
            </Button>
          )}
        </div>
        <Box className={styles.invoiceFoot} bgcolor="background.paper" />
      </Box>
    );
  };
  if (isMobileSize) {
    return (
      <AppDialogComponent
        open={open}
        onClose={onClose}
        mobileStyle={4}
        className={styles.modal}
        contentClassName={styles.container}
        headerClassName="d-none"
      >
        <div className={styles.header}>
          <Typography className={styles.title}>
            پیش فاکتور {isBuy ? "خرید" : "فروش"}
            {/* {data.currency.faName} */}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {mainContent()}
      </AppDialogComponent>
    );
  }
  return (
    <Modal open={open} className={styles.modal}>
      <Fade in={open}>
        <Box className={styles.container}>
          {!!data && (
            <>
              <Box bgcolor="background.paper" className={styles.header}>
                <Box
                  bgcolor="background.paper"
                  className={styles.logoContainer}
                >
                  <img src={data.currency.icon} alt={data.currency.coin} />
                </Box>
                <Typography align="center">
                  پیش فاکتور {isBuy ? "خرید" : "فروش"}
                  {/* {data.currency.faName} */}
                </Typography>
              </Box>
              {mainContent()}
              <Box sx={{ pt: 6 }} />
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
