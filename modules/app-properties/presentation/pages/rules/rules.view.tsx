import { Container, Paper, Typography } from "@mui/material";
import styles from "./rules.module.scss";
import Image from "next/image";
import TERMS_OF_SERVICE from "@/public/images/terms-of-service.png";
// import TERMS_OF_SERVICE from "@/public/images/terms-of-service.svg";
import AppHeaderComponent from "@/core/components/layouts/app-header";

type PropTypes = {};
export default function RulesView(props: PropTypes) {
  return (
    <div className={styles.root}>
      <AppHeaderComponent
        className={styles.pageHeader}
        title="قوانین بیت‌برگ"
        backHref="/profile"
      />
      <Container className={styles.container}>
        <div className={styles.paper}>
          <div className={styles.headImageWrapper}>
            <Image src={TERMS_OF_SERVICE} />
          </div>
          {/* <Typography className={styles.mainTitle} component="h1">
            قوانین بیت‌برگ
          </Typography> */}
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              شرایط استفاده کاربران از خدمات بیت‌برگ:
            </Typography>
            <Typography>
              موضوع توافقنامه حاضر تدوین اصول اولیه از قبیل حقوق، تکالیف و
              مسئولیت‌ها و نیز دستورالعمل‌ های لازم جهت استفاده کاربران از خدمات
              وبسایت https://crypto.com که از این پس سایت نامیده می شود، می باشد
              و افراد در انجام تعهدات خود تابع قوانین جمهوری اسلامی ایران بوده و
              از کلیه مقررات حاکم بر آن تبعیت می کنند.
            </Typography>
            <Typography>
              هر گونه تغییر در مفاد این موافقتنامه که از سوی ما صورت پذیرد و یا
              از طرق دیگر ابلاغ گردد، از طریق وبسایت https://crypto.com به اطلاع
              کاربران خواهد رسید.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              مفاد توافقنامه
            </Typography>
            <Typography>
              ۱- کریپو مجموعه‌ای دانش بنیان در حوزه ارزهای دیجیتال می باشد که
              معاملات در این سایت به صورت آنلاین و صرفا از طریق سایت انجام
              می‌گردد.
            </Typography>

            <Typography>
              ۲- کریپو بعنوان یک پلتفرم خرید و فروش رمز ارز مستقیما اقدام به
              خرید و فروش ارز های دیجیتال با کاربران می‌کند و شخص ثالثی در
              معاملات نقش ندارد.
            </Typography>

            <Typography>
              ۳- استفاده از کلیه خدمات کریپو (ثبت نام، خرید، فروش و ...) به این
              معنی است که کاربر مفاد این توافقنامه را کاملاً خوانده، فهمیده و
              پذیرفته است. در غیر اینصورت، حق استفاده از خدمات سایت را ندارد.
            </Typography>

            <Typography>
              ۴- این حق برای سایت محفوظ می باشد که در هر زمان که بخواهد، با
              اعلام مراتب قبلی به کاربر مفاد این موافقتنامه را تغییر دهد.
            </Typography>
            <Typography>
              ۵- تمامی معاملات صورت گرفته توسط کاربر صحیح و واقعی تلقی می‌گردد.
              از این رو صیانت از حساب کاربری، حساب های بانکی یا سایر اطلاعات
              برعهده وی بوده و لازم است به صدمات ناشی از انجام تخلفات یا جرایم
              مالی توجه داشته باشد.
            </Typography>

            <Typography>
              ۶- در مورد رمزارزهایی مانند بیت کوین، صادره کننده‌ای وجود ندارد و
              لذا هیچ شخص ثالثی از جمله ما در داخل یا خارج از ایران، ارزش و یا
              نقد کردن آن را تضمین نمی‌کند. لذا رمز ارزهایی مانند بیت کوین
              می‌تواند در کشورهای مختلف دارای ارزش های متفاوتی باشد. بنابراین ،
              توجه داشته باشید رمز ارزها عموماً و برخلاف واحدهای پولی سنتی
              (فیات) دارای ریسک ذاتی هستند.
            </Typography>

            <Typography>
              ۷- معاملات رمز ارزها در شبکه بلاکچین ثبت می‌شوند تا کاربران
              بتوانند به انجام معامله اطمینان نمایند.
            </Typography>
            <Typography>
              ۸- در صورتی که در اثر فعالیت‌های غیر قانونی کاربر خسارتی به سایت
              وارد شود، کریپو می‌تواند مطابق قانون نسبت به مطالبه‌ آن اقدام کند.
              لذا باید با رعایت قوانین و مقررات از خدمات کریپو استفاده کنید.
            </Typography>
            <Typography>
              ۹- مواردی که در این موافقتنامه مضبوط نمی‌باشد، تابع قوانین و
              مقررات جمهوری اسلامی ایران یا تابع سیاست‌های عملیاتی و قواعد
              اعلامی از سوی کریپو خواهد بود.(که مجموعاً مقررات نامیده می‌شود) در
              صورت وجود تعارض میان مقررات و مفاد مندرج در این موافقتنامه ، مفاد
              مقررات ملاک عمل خواهد بود.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              مدیریت حساب‌های کاربری:
            </Typography>
            <Typography>
              ما به منظور ایجاد حساب، از شماره همراه استفاده می‌کنیم که این
              شماره بعنوان شناسه کاربری شما در سایت محسوب میگردد.
            </Typography>
            <Typography>
              مراحل فرایند ایجاد حساب از سوی شما به شرح ذیل است:
            </Typography>
            <Typography>۱- وارد کردن شماره همراه</Typography>
            <Typography>
              ۲- دریافت کد فعالسازی یکبار مصرف و تعیین کلمه عبور
            </Typography>
            <Typography>۳- وارد کردن اطلاعات هویتی توسط کاربر</Typography>
            <Typography>۴- اعلام موافقت با این توافقنامه</Typography>
            <Typography>
              کاربر برای استفاده از خدمات سایت به یک حساب نیاز داشته و موظف به
              استفاده از حساب ایجاد شده از طریق وارد کردن اطلاعات صحیح می باشد
              که کاربر در این امر نباید از اطلاعات سایر افراد سوء استفاده کرده
              یا قوانین و مقررات مربوطه را نقض نماید.
            </Typography>
            <Typography>
              اطلاعات هویتی کاربران از طریق مراجع حرفه‌ای تا آن جا که قانون مجاز
              می‌داند مورد بررسی قرار می گیرد. هدف از این امر احراز انطباق
              اطلاعات ارائه شده با واقعیت است.
            </Typography>
            <Typography>۵- رد درخواست ایجاد حساب</Typography>
            <Typography>
              در موارد ذیل می‌توانیم ایجاد حساب را مردود اعلام کرده و نسبت به
              حذف حساب اقدام نماییم:
            </Typography>
            <Typography>
              ۱-۵- چنانچه متقاضی به سن قانونی نرسیده (۱۸ سال کامل شمسی) یا از
              اهلیت قانونی کافی برخوردار نباشد.
            </Typography>
            <Typography>
              ۲-۵- تلاش برای ایجاد حساب از طریق ارائه‌ی اطلاعات شخصی دیگران توسط
              شما با مدارک هویتی اشخاص دیگر
            </Typography>
            <Typography>
              ۳-۵- عدم وارد کردن اطلاعات لازم یا وارد کردن اطلاعات نادرست در
              زمان ایجاد حساب از سوی کاربر
            </Typography>
            <Typography>
              ۴-۵- در صورت عدم رعایت سایر قوانین و مقررات از سوی شما یا انجام
              اقداماتی برخلاف استانداردهای که توسط سایت اعلام می‌گردد.
            </Typography>
            <Typography>
              ۵-۵- چنانچه مشخص شود که با نقض هر یک از مفاد این موافقتنامه نسبت
              به ایجاد حساب اقدام نموده اید، می‌توانیم بلافاصله ممنوعیت‌های
              مناسب از قبیل قطع امکان استفاده از خدمات برای کاربران معین یا حذف
              حساب کاربران را به مورد اجرا بگذاریم.
            </Typography>
            <Typography>۶- تعلیق ایجاد حساب</Typography>
            <Typography>
              در صورت تحقق موارد ذیل می‌توانیم فرایند ایجاد حساب از سوی شما را
              به حالت تعلیق درآوریم:
            </Typography>
            <Typography>
              ۱-۶- در صورت عدم وجود ظرفیت لازم برای ارائه‌ی خدمات
            </Typography>
            <Typography>
              ۲-۶- در صورتی که از جنبه‌ی فنی و مالی، تعلیق حساب از نظرسایت لازم
              باشد.
            </Typography>
            <Typography>۷- مسئولیت حساب‌ها</Typography>
            <Typography>
              ۱-۷- حساب شما تنها باید توسط خود شما مورد استفاده قرار گیرد و
              نباید تحت هیچ شرایطی به دیگران اجازه بدهید از آن استفاده کنند.
            </Typography>
            <Typography>
              ۲-۷- در خصوص خسارات ناشی از عدم ارایه اطلاعات صحیح و یا صدمه‌ ناشی
              از استفاده‌ غیر مجاز از حساب توسط ثالث که رمز عبور شما را به سرقت
              برده است، مسئولیتی نخواهیم داشت. در این حالت موظف به جبران خسارت
              وارده به شخص ثالث در اثر کلاهبرداری مالی خواهید بود. علاوه بر آن،
              در خصوص جبران خسارت شخص ثالث از سوی شما هیچگونه مسئولیتی بر عهده‌ی
              ما نخواهد بود.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              استفاده از خدمات
            </Typography>
            <Typography>۱- ارائه‌ی خدمات و هزینه‌ی استفاده از آن</Typography>
            <Typography>
              ۱-۱- خدمات بیت‌برگ شامل ارایه زیرساخت های لازم به منظور تشکیل یک
              بازار خرید و فروش رمزارزها برای کاربران سایت و با استفاده از پول
              رایج کشور می باشد.
            </Typography>
            <Typography>
              ۲-۱- برای ارائه‌ی بهتر خدمات، ممکن است اطلاعیه ها و آموزش های
              مربوط به استفاده از خدمات سایت برای شما ارسال شود.
            </Typography>
            <Typography>
              ۳-۱- هزینه‌ی جانبی مالی و یا مخابراتی که در حین فرایند استفاده از
              خدمات سایت، با آن روبرو می شوید ارتباطی با خدمات ما ندارد.
            </Typography>
            <Typography>۲- نحوه‌ی استفاده از خدمات و موارد مهم</Typography>
            <Typography>
              کاربران می توانند از کلیه خدمات ارایه شده، استفاده نمایند اما ممکن
              است با توجه به موارد ذیل در استفاده از خدمات با محدودیت‌هایی روبه
              رو گردند.
            </Typography>
            <Typography>
              ۱-۲- کاربر نباید در ارائه‌ی خدمات ما دخالت و به شیوه‌ای غیر از
              آنچه که ما مجاز می‌دانیم استفاده نماید.
            </Typography>
            <Typography>
              ۲-۲- رفتارهای مختلف از قبیل جمع آوری و استفاده‌ی غیر مجاز از
              اطلاعات کاربران، استفاده از خدمات برای اهداف تجاری (بدون امضاء
              قرارداد استفاده تجاری با ما)، نشر اطلاعات برخلاف قوانین و مقررات،
              انتقال اطلاعات حساب‌ها و یا قرض دادن آنها (استفاده از حساب اجاره
              ای) و ارائه‌ی خدمات جانبی ممنوع خواهد بود.
            </Typography>
            <Typography>
              ۳-۲- در صورت عدم رعایت و یا نقض قوانین و مقررات مربوط و یا
              توافقنامه استفاده از سایت از سوی شما، حساب کاربری شما مورد بررسی
              قرار گرفته و به طور موقت یا دائمی مانع استفاده‌ شما از خدمات
              خواهیم شد.
            </Typography>
            <Typography>
              ۴-۲- درآمد بیت‌برگ از کارمزد معاملات کاربران می باشد.
            </Typography>
            <Typography>
              ۵-۲- در صورتی که عضویت شما لغو گردد، اطلاعات شما نزد ما محفوظ
              خواهد بود و قادر نخواهید بود حذف اطلاعات موجود را درخواست نمایید.
            </Typography>
            <Typography>۳- حفاظت از اطلاعات شخصی:</Typography>
            <Typography>
              اطلاعات شخصی شما تنها برای موضوع مورد توافق و در چارچوب آن مورد
              استفاده قرار خواهد گرفت تا خدمات به طور منظم ارائه گردد. اطلاعات
              شخصی شما جز با رضایت جداگانه از طرف شما به ثالث ارائه نخواهد شد.
            </Typography>
            <Typography>
              نسبت به وقوع احتمالی خسارت ناشی از کلاهبرداری مالی باید خود توجه
              کافی داشته باشید و اگر کلاهبردار مالی یا الکترونیکی موجب تحقیق از
              ناحیه‌ی مراجع تحقیقاتی، قضایی، اداری یا نهاد عمومی دیگری شود،
              می‌توانیم نسبت به تعلیق حساب شما و کیف پول رمزارز به طور همزمان
              اقدام کنیم.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              کاربر می پذیرد که:
            </Typography>
            <Typography>
              ۱- منبع و مقصد کلیه رمزارزها و وجوه نقد ارائه شده توسط وی در
              تراکنش های سایت کاملا قانونی و مطابق با قوانین بین المللی و مقررات
              جمهوری اسلامی ایران باشند.
            </Typography>
            <Typography>
              ۲- مالک قانونی وجوه و حساب هایی است که وی در هر سفارش به هر نحو چه
              برای پرداخت و چه برای دریافت از آنها استفاده کرده است.
            </Typography>
            <Typography>
              ۳- اطلاعاتی که کاربر در خلال سفارش یا ثبت نام در سایت وارد کرده
              است کاملا محفوظ خواهد ماند و به هیچ شخص ثالثی ارائه نخواهد شد مگر
              با نامه قضایی و یا درخواست کتبی پلیس محترم فتای جمهوری اسلامی
              ایران.
            </Typography>
            <Typography>
              ۴- این حق برای بیت‌برگ محفوظ است که هر گونه اطلاعات لازم برای
              احراز هویت را بعد از ثبت سفارش خرید از کاربر بخواهد. در این حال تا
              احراز هویت کامل به عمل نیامده است، ارسال ارز امکان نخواهد داشت.
            </Typography>
            <Typography>
              ۵- فرآیند احراز هویت شامل گردآوری اطلاعاتی از کاربر، من جمله شماره
              همراه، کارت شناسایی با تصویر سلفی، کد ملی و اطلاعات بانکی وی می
              باشد.
            </Typography>
            <Typography>
              این اقدامات حریم شخصی وی را نقض نخواهد کرد و به هیچ شخص ثالثی
              ارائه نخواهد شد.
            </Typography>
            <Typography>
              ۶- تصمیم راجع به موفق یا ناموفق بودن احراز هویت فقط و فقط در
              اختیار بیت‌برگ خواهد بود و سایت بیت‌برگ می تواند یک احراز هویت را
              به تشخیص خود قبول یا رد کند.
            </Typography>
            <Typography>
              ۷- تراکنش هایی که توسط بیت‌برگ در خلال انجام سفارشات انجام می شوند
              غیر قابل بازگشت هستند و تابع قوانین مربوط به شبکه هر رمزارز در
              تراکنش انجام شده می باشند.
            </Typography>
            <Typography>
              ۸- کاربر می پذیرد که اطلاعات لازم در طی سفارش را با دقت وارد کرده،
              کلیه مسئولیت مربوط به اشتباه وارد کردن اطلاعات در خلال سفارش با
              خود وی است و بیت‌برگ هیچ مسئولیتی راجع به سفارش انجام شده ای که
              اطلاعات اشتباه داشته و موجب زیان کاربر شده نمی پذیرد.
            </Typography>
            <Typography>
              ۹- هر گونه کارمزد، کمیسیون و هزینه ی دیگر که سیستم بانکی جهت نقل و
              انتقال پول به کاربر تحمیل نماید، بر عهده کاربر خواهد بود و بیت‌برگ
              هیچ گونه مسئولیتی راجع به این گونه هزینه ها نمی پذیرد.
            </Typography>
            <Typography>
              ۱۰- بیت‌برگ هیچ گونه مسئولیتی راجع به تاخیر یا تراکنش ناموفق ایجاد
              شده در انجام سفارش به علت نقص یا مشکل یا بروز رسانی شبکه رمز ارزها
              و یا بانک پذیرنده را نمی پذیرد.
            </Typography>
            <Typography>
              ۱۱- حقوق هر کاربر برای استفاده از سایت مخصوص به خود اوست. کاربر می
              پذیرد که مسئولیت کلیه تراکنش های انجام شده از حساب کاربری وی به
              عهده خود وی می باشد.
            </Typography>
            <Typography>
              ۱۲- هر گونه پیامدهای مالیاتی ناشی از تراکنش های کاربران به عهده
              خود آنان خواهد بود و بیت‌برگ هیچ گونه مسئولیتی نمی پذیرد.
            </Typography>
            <Typography>
              ۱۳- کاربر می پذیرد که جز در مورد انجام صحیح معامله با قیمت و
              کارمزد مشخص و شفاف طبق این قرارداد هیچ گونه ادعایی از سایت و
              مدیران، کارکنان و کلیه ی مرتبطان با این سایت نداشته باشد.
            </Typography>
            <Typography>
              ۱۴- تعیین قیمت نهایی خرید ارز در زمان بازگشت از درگاه بانکی صورت
              می‌پذیرد و قیمت قید شده در پیش‌فاکتور تقریبی بوده و قابل تغییر
              است.
            </Typography>
            <Typography>
              ۱۵- فرایند فروش بیت‌کوین به بیت‌برگ در دومرحله انجام می‌شود، مرحله
              اول ارسال ارز توسط کاربر به بیت‌برگ و مرحله دوم انتقال ارز از
              بیت‌برگ به صرافی بین‌المللی خواهد بود تعیین قیمت نهایی فروش ارز
              زمان دریافت ارز در صرافی بین‌المللی خواهد بود و ارسال اولیه کاربر
              ملاک تعیین قیمت نخواهد بود و قیمت قید شده در پیش‌فاکتور تقریبی
              بوده و قابل تغییر است.
            </Typography>
            <Typography>
              ۱۶- زمان واریز ارز و ریال توسط بیت‌برگ در بخش سفارشات مشخص گردیده
              است که به صلاحدید و فراخور شرایط (قضایی، بانکی، فنی و ...) قابل
              تغییر است.
            </Typography>
            <Typography>
              ۱۷- کارمزد معاملات کریپو بر اساس کارمزد معاملات در صرافی بایننس
              تعریف شده است و از طریق آدرس
              https://www.binance.com/en/fee/schedule قابلیت رصد دارد.
            </Typography>
            <Typography>
              ۱۸- با توجه به اینکه ارز خریداری شده کاربر در لحظه توسط بیت‌برگ از
              صرافی بین‌المللی خریداری می‌شود امکان لغو و استرداد وجه وجود
              ندارد.
            </Typography>
            <Typography>
              ۱۹- چنانچه پس از ۷ روز خریدار اقدام به تکمیل و تایید فرایند احراز
              هویت خود نکند، کریپو این حق را دارد که سفارش خرید کاربر را کنسل
              کند و به قیمت روز ارز را به ریال تبدیل نماید.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              نکات مهم در رابطه با خدمات معاملات بیت‌برگ
            </Typography>
            <Typography>
              ۱- در صورت حصول اطمینان از عدم صحت اطلاعات شخصی کاربری، موظف به
              قطع استفاده‌ی کاربر مربوطه از خدمات معاملات بیت‌برگ خواهیم بود و
              اقدامات متقابل را به انجام خواهیم رساند.
            </Typography>
            <Typography>
              ۲- در برابر خسارات ناشی از به سرقت رفتن حساب شما توسط شخص ثالث
              مسئولیتی نخواهیم داشت.
            </Typography>
            <Typography>
              ۳- می‌توانیم واریز و یا برداشت ریال را در شرایط ذیل ممنوع کرده و
              البته ممنوعیت و علت آن را به شما اعلام خواهیم کرد:
            </Typography>
            <Typography>
              ۱-۳- چنانچه درخواست کتبی از محاکم و نهادهای دولتی در این خصوص
              ارائه شود.
            </Typography>
            <Typography>
              ۲-۳- در صورتی که کاربر مرتکب جرم شده یا مظنون به تملک عواید از محل
              ارتکاب جرم باشد.
            </Typography>
            <Typography>
              ۳-۳- در سایر موارد چنانچه محدود کردن استفاده از خدمات پرداخت بر
              اساس سیاست عملیاتی ما ضروری تشخیص داده شود.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              سایر موارد
            </Typography>
            <Typography>
              ۱- در حدود قانون هیچگونه تعهد یا ضمانتی برای امور خاص مسکوت مانده
              در این موافقتنامه از حیث ارائه‌ی خدمات بر عهده نمی گیریم. علاوه بر
              این، در خصوص ارزش رمز ارزهایی که خود آن را صادر نکرده یا واگذار
              ننموده و همچنین پرداخت آن را ضمانت ننموده ایم، هیچ گونه تعهدی
              نخواهیم داشت.
            </Typography>
            <Typography>
              ۲- چنانچه اطلاعات ارائه شده از سوی شما با واقعیت همخوانی نداشته
              باشد، می توانیم ارائه‌ خدمات را متوقف کرده یا تمامی یا بخشی از این
              موافقتنامه را فسخ نماییم. در صورتی که خسارتی متوجه ما شود،
              می‌توانیم خسارت مذکور را به حساب شما منظور نماییم.
            </Typography>
            <Typography>
              ۳- در صورت ورود خسارت به ما که ناشی از فعالیت های غیر قانونی باشد،
              می‌توانیم از حق مطالبه خسارت علیه شما به موجب قانون استفاده کنیم.
              لذا لازم است از خدمات در چارچوب قوانین و مقررات استفاده نمایید.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              اعلامیه ها
            </Typography>
            <Typography>
              می توانیم موارد مهم مربوط به این موافقنامه و نیز خدمات را با اعلام
              آن‌ها در اولین صفحه‌ی نمایش یا صفحه‌ی اعلامیه‌های خدمات در صورت
              لزوم به ترتیب اعلام آن از طریق ایمیل یا پیامک ثبت شده در حساب به
              کاربر منتقل نماییم.
            </Typography>
          </div>
          <div className={styles.section}>
            <Typography className={styles.title} component="h3">
              حل اختلاف
            </Typography>
            <Typography>
              این موافقنامه یا خدمات بر اساس قوانین جمهوری اسلامی ایران، قطع نظر
              از تابعیت یا محل سکونت کاربر تفسیر شده و تابع آن خواهد بود. قانون
              حاکم به حل و فصل اختلافات تابع قوانین ایران است. البته در صورتی که
              قانون مشخص یا رأی دادگاه در پیرامون پول مجازی و غیره وجود نداشته
              باشد، رویه یا باور قوی خارج از این کشور می‌توانید در چارچوب قوانین
              و مقررات راجع به اختلاف ذیل این موافقنامه یا خدمات موجد اثر گردد.
              با بروز اختلاف فی ما بین ما و کاربر در خصوص استفاده از خدمات، تلاش
              می‌کنیم این اختلاف مرتفع گردد در صورت ادامه اختلاف امکان طرح دعوی
              از طریق ارجاع به داوری، ذیل قانون آیین دادرسی مدنی وجود خواهد
              داشت.
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}