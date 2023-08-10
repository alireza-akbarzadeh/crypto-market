import AppHeaderComponent from "@/core/components/layouts/app-header";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  LinearProgress,
  Divider,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import CoinLineChartComponent from "../../components/coin-line-chart";
import styles from "./coin-details.module.scss";
import { TetherIcon } from "@/core/components/common/custom-icon";
import { currencyFormat, handleSmoothScroll } from "@/core/helpers";
import ArrowUpIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import clsx from "clsx";

const data = {
  coin: {
    faName: "بیت کوین",
    enName: "Bitcoin",
    shortName: "BTC",
  },
};

type PropTypes = {
  coin: any;
};
export default function CoinDetailsView(props: PropTypes) {
  // const {  } = props;
  const { coin } = data;
  return (
    <div className={styles.root}>
      <AppHeaderComponent bgcolor="background.secondary" />
      <Container>
        <div className={styles.breadCrumb}>
          <Link href="/live-price">
            <Typography component="a">قیمت لحظه‌ای</Typography>
          </Link>{" "}
          / <Typography component="span">{coin.faName}</Typography>
        </div>
        <Grid container spacing={{ xs: 2, lg: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper className={clsx(styles.paper, styles.summery)}>
              <div className={styles.coinName}>
                <div>
                  <Image
                    src={"https://crypto.me/images/coins/BTC.png"}
                    width={48}
                    height={48}
                  />
                </div>
                <div className={styles.name}>
                  <Typography component="div">بیت کوین</Typography>
                  <Typography component="div" color="text.secondary">
                    BTC . Bitcoin
                  </Typography>
                </div>
              </div>

              <Typography component="div" color="text.secondary">
                آخرین قیمت
              </Typography>
              <div className={styles.currentPrice}>
                <Typography
                  variant="h4"
                  className="en"
                  component="span"
                  fontWeight={700}
                >
                  <TetherIcon className={styles.tether} />
                  {currencyFormat(56320)}
                </Typography>
                <Typography
                  className={clsx({
                    [styles.changes]: true,
                    [styles.dump]: true,
                    [styles.pump]: false,
                  })}
                  variant="h6"
                  component="span"
                >
                  {true ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  {12.3}٪
                </Typography>
              </div>
              <div className={styles.progressContainer}>
                <Typography component="div">در ۲۴ ساعت گذشته</Typography>
                <LinearProgress
                  classes={{ root: styles.progress, bar: styles.progressBar }}
                  variant="determinate"
                  value={20}
                />
                <div className={styles.progressRange}>
                  <div>
                    <Typography color="text.secondary" component="div">
                      حد‌اقل قیمت
                    </Typography>
                    <Typography
                      color="text.secondary"
                      component="div"
                      className="en"
                    >
                      {currencyFormat(56320)}
                      <TetherIcon className={styles.tether} />
                    </Typography>
                  </div>
                  <div className={styles.max}>
                    <Typography color="text.secondary" component="div">
                      حد‌اکثر قیمت
                    </Typography>
                    <Typography
                      color="text.secondary"
                      component="div"
                      className="en"
                    >
                      {currencyFormat(56320)}
                      <TetherIcon className={styles.tether} />
                    </Typography>
                  </div>
                </div>
              </div>
              <Divider className={styles.divider} />
              <div className={styles.row}>
                <Typography component="div">حجم بازار</Typography>
                <Typography component="div" className="en">
                  ${currencyFormat(56320)}
                </Typography>
              </div>
              <div className={styles.row}>
                <Typography component="div">خرید از کریپو</Typography>
                <Typography component="div">
                  {currencyFormat(56320)} <span>تومان</span>
                </Typography>
              </div>
              <div className={styles.row}>
                <Typography component="div">فروش به کریپو</Typography>
                <Typography component="div">
                  {currencyFormat(56320)} <span>تومان</span>
                </Typography>
              </div>
              <Button variant="contained" fullWidth>
                خرید / فروش
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Paper className={clsx(styles.paper, styles.chartSection)}>
              <Typography variant="h6" component="h3">
                تغییرات
              </Typography>
              <div className={styles.chartContainer}>
                <CoinLineChartComponent coin={"BTC"} />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={clsx(styles.paper, styles.info)}>
              <Grid spacing={4} container>
                <Grid item xs={12} md={9}>
                  <section id="about">
                    <Typography className={styles.title} component="h2">
                      درباره {"بیت کوین"}
                    </Typography>
                    <Typography>
                      بیت کوین یک ارز رمز یا همان ارز دیجیتال است که قابلیت
                      پرداخت های بین المللی را به ما می‌دهد و همانند پول های
                      رایج عمل می‌کند. به عبارتی دیگر بیت کوین نوعی دارایی
                      دیجیتال است که به صورت دیجیتال نگهداری و انتقال داده
                      می‌شود.
                    </Typography>
                    <Typography>
                      نقل و انتقالات و تراکنش های بیت کوین در سلسله ای بهم تنیده
                      شده از اطلاعات به صورت رمزنگاری شده ذخیره می‌شود که به آن
                      بلاکچین و در زبان فارسی زنجیره بلوک گفته می شود. تراکنش
                      های بیت کوینی به صورت طبقه بندی شده در بلاک ها نگهداری
                      می‌شوند. آنچه که این دارایی دیجیتال را جذاب تر می‌کند
                      محدودیت ۲۱ میلیون واحدی آن است. پس از استخراج ۲۱ میلیون
                      بیت کوین پروسه استخراج به اتمام می‌رسد و ماینر ها تنها به
                      پردازش تراکنش ها و تایید آنها خواهند پرداخت.
                    </Typography>
                    <Typography>
                      تمامی ویژگی های لازم برای نگهداری ارزش تحت عنوان دارایی در
                      بیت کوین قابل مشاهده است و بیت کوین این مزیت را نسبت به
                      بقیه ارزها دارد که در هرجایی و هر زمانی قابلیت انتقال دارد
                      و محدودیت های قانونی و بانکی ندارد. در هر لحظه که اراده
                      کنید می‌توانید بیت کوین خود را به هرجایی از این کره خاکی
                      ارسال کنید و معاملات خود را انجام دهید.
                    </Typography>
                  </section>
                  <section className={styles.tradeSection} id="trade">
                    <Typography className={styles.title} component="h2">
                      خرید و فروش
                    </Typography>
                    <div className={styles.tradeBox}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={"https://crypto.me/images/coins/BTC.png"}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className={styles.price}>
                        <Typography component="div">خرید از کریپو</Typography>
                        <Typography component="div">
                          {currencyFormat(122312312)} <span>تومان</span>
                        </Typography>
                      </div>
                      <div className={styles.price}>
                        <Typography component="div">فروش به کریپو</Typography>
                        <Typography component="div">
                          {currencyFormat(122312312)} <span>تومان</span>
                        </Typography>
                      </div>
                      <Button variant="contained">خرید و فروش</Button>
                    </div>
                  </section>
                  <section className={styles.walletSection} id="wallet">
                    <Typography className={styles.title} component="h2">
                      کیف پول
                    </Typography>
                    <Typography>
                      یکی از دغدغه های اصلی دارندگان بیت کوین نحوه نگهداری
                      Bitcoin است، جهت نگهداری بیت کوین از نرم افزار های آفلاین
                      که اصطلاحا کیف پول سرد نامیده می‌شوند و نرم افزار های
                      آنلاین که کیف پول گرم نامیده می‌شوند می‌توانید استفاده
                      کنید.
                    </Typography>
                    <Typography className={styles.note}>
                      کریپو سرویس کیف پول ارائه نمی‌دهد اما اگر شما به دنبال یک
                      کیف پول امن، سریع و آسان هستید که تنوع گسترده‌ای از آلت
                      کوین ها را پشتیبانی کند، می‌توانید به مقاله
                      <Link href="/how-to-create-wallet" passHref>
                        <Typography
                          component="a"
                          color="primary"
                          fontWeight={600}
                          target="_blank"
                        >
                          {" "}
                          آموزش ساخت کیف پول{" "}
                        </Typography>
                      </Link>
                      مراجعه کنید.
                    </Typography>
                  </section>
                  <section id="faq" className={styles.faqSection}>
                    <Typography className={styles.title} component="h2">
                      سوالات متداول
                    </Typography>
                    <div className={styles.accordionContainer}>
                      <Accordion className={styles.accordion}>
                        <AccordionSummary expandIcon={<AddCircleOutlineIcon />}>
                          <Typography
                            className={styles.innerTitle}
                            component="h3"
                          >
                            {"قیمت بیت کوین در کریپو چگونه تعیین می‌شود؟"}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {
                              "قیمت بیت کوین همانند سایر ارزهای رایج دنیا نوسان دارد با این تفاوت که قیمت آن را نهاد، سازمان و یا دولتی تعیین نمی‌کند بلکه میزان عرضه و تقاضای کاربران تنها معیار تعیین کننده قیمت بیت کوین است. در کریپو معیار قیمت گذاری، قیمت لحظه ای معاملات در صرافی بین المللی بایننس است."
                            }
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className={styles.accordionContainer}>
                      <Accordion className={styles.accordion}>
                        <AccordionSummary expandIcon={<AddCircleOutlineIcon />}>
                          <Typography
                            className={styles.innerTitle}
                            component="h3"
                          >
                            {"قیمت بیت کوین در کریپو چگونه تعیین می‌شود؟"}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {
                              "قیمت بیت کوین همانند سایر ارزهای رایج دنیا نوسان دارد با این تفاوت که قیمت آن را نهاد، سازمان و یا دولتی تعیین نمی‌کند بلکه میزان عرضه و تقاضای کاربران تنها معیار تعیین کننده قیمت بیت کوین است. در کریپو معیار قیمت گذاری، قیمت لحظه ای معاملات در صرافی بین المللی بایننس است."
                            }
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </section>
                </Grid>
                <Grid className="desktop-up" item md={3}>
                  <div className={styles.navigator}>
                    <ul className={styles.navigatorList}>
                      <li>
                        <Typography
                          component="a"
                          href="#about"
                          onClick={handleSmoothScroll}
                        >
                          درباره بیت کوین
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          component="a"
                          href="#trade"
                          onClick={handleSmoothScroll}
                        >
                          خرید و فروش
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          component="a"
                          href="#wallet"
                          onClick={handleSmoothScroll}
                        >
                          کیف پول
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          component="a"
                          href="#faq"
                          onClick={handleSmoothScroll}
                        >
                          سوالات متداول
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
