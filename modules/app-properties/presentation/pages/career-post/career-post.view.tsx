import AppHeaderComponent from "@/core/components/layouts/app-header";
import { Button, Container, Toolbar, Typography } from "@mui/material";
import styles from "./career-post.module.scss";
import ForwardIcon from "@/core/components/common/custom-icon/arrow-forward";
import Link from "next/link";
import LoadingComponent from "@/core/components/common/loading";

type PropTypes = { isFallback: boolean };
export default function CareerPostView(props: PropTypes) {
  const { isFallback } = props;
  const backButton = (
    <Link href="/careers">
      <Button
        color="inherit"
        startIcon={<ForwardIcon className={styles.buttonIcon} />}
      >
        بازگشت
      </Button>
    </Link>
  );
  return (
    <div className={styles.root}>
      <AppHeaderComponent elevation={1} />
      <Toolbar className="desktop-down">{backButton}</Toolbar>
      <div className={styles.banner}>
        {!isFallback && (
          <>
            <Typography component="h1" className={styles.title}>
              طراح گرافیک
            </Typography>
            <Typography component="h2" className={styles.subtitle}>
              Graphic Designer
            </Typography>
          </>
        )}
      </div>
      {isFallback ? (
        <LoadingComponent mt={5} />
      ) : (
        <Container>
          <Toolbar className="desktop-up" disableGutters>
            {backButton}
          </Toolbar>
          <div className={styles.content}>
            <Typography component="h2" className={styles.title}>
              شرح وظایف
            </Typography>
            <Typography className={styles.paragraph}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </Typography>
            <Typography component="h2" className={styles.title}>
              مورد نیاز
            </Typography>
            <ul className="dot-list">
              <Typography component="li">حداقل 2 سال سابقه کار</Typography>
              <Typography component="li">
                تجربه گسترده در ارائه تجزیه و تحلیل سطح بالا و مشاوره در مورد
                مدیریت، پیاده سازی، و توسعه سیستم عامل های زیرساختی بسیار در
                دسترس است.
              </Typography>
              <Typography component="li">
                حداقل 10 سال تجربه در امنیت IT، با تجربه در نظارت / مدیریت تیم.
              </Typography>
              <Typography component="li">
                تجربه اثبات شده در ISMS، NIST، و سیستم ها و چارچوب های مدیریت
                ریسک.
              </Typography>
            </ul>
            <Button className={styles.sendButton} variant="contained">
              ارسال رزومه
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
}
