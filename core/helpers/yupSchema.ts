import * as Yup from "yup";
import {
  PHONE_NUMBER_REG,
  PASSWORD_REG,
  PERSIAN_REG,
  CARD_SERIAL_NUMBER_REG,
} from "@/core/constants/regex";

type TypeCreatorOptions = {
  type?: keyof typeof Yup;
  min?: number;
  max?: number;
  required?: boolean;
  matches?: RegExp | { record: string; reg: RegExp };
  trim?: boolean;
  transform?: any;
  uppercase?: boolean;
  lessThan?: number;
  test?:
    | {
        name?: string;
        error?: string;
        function: (value: string) => boolean;
      }
    | ((value: string) => boolean);
};
const typeCreator = (name: string, options: TypeCreatorOptions = {}) => {
  const {
    type,
    min,
    max,
    required,
    matches,
    trim,
    transform,
    uppercase,
    lessThan,
    test,
  } = options;
  // @ts-ignore: Unreachable code error
  let t = Yup[type || "string"]();
  if (trim) t = t.trim();
  if (uppercase) t = t.uppercase();
  const getMaxMessage = ({ max }: { max: number }) => {
    if (type === "number") {
      return `${name} نمیتواند بیشتر از ${max} باشد.`;
    }
    return `${name} میتواند حداکثر ${max} کارکتر باشد.`;
  };
  const getMinMessage = ({ min }: { min: number }) => {
    if (type === "number") {
      return `${name} نمیتواند کمتر از ${min} باشد.`;
    }
    return `${name} باید حداقل ${min} کارکتر باشد.`;
  };
  if (min) t = t.min(min, getMinMessage);
  if (max) t = t.max(max, getMaxMessage);
  if (lessThan)
    t = t.lessThan(
      lessThan,
      ({ less }: { less: number }) => `${name} باید کمتر از ${less} باشد`
    );
  if (matches) {
    if (matches instanceof RegExp) {
      t = t.matches(matches, `${name} وارد شده صحیح نمیباشد.`);
    } else {
      t = t.matches(matches.reg, `${name} ${matches.record}`);
    }
  }
  if (transform) t = t.transform(transform);
  if (required) {
    t = t.required(`${name} الزامی است.`);
  }
  if (test) {
    if (typeof test === "function") {
      t = t.test(name + "-test", `${name} وارد شده صحیح نمیباشد.`, test);
    } else {
      t = t.test(
        test.name || name + "-test",
        test.error || `${name} وارد شده صحیح نمیباشد.`,
        test.function
      );
    }
  }
  return t;
};

const yupSchema = {
  // Passwords
  password: typeCreator("رمز عبور", { required: true, min: 8 }),
  newPassword: typeCreator("رمز عبور", {
    required: true,
    min: 8,
    matches: {
      reg: PASSWORD_REG,
      record: "باید ترکیبی از حروف بزرگ، کوچک و اعداد انگلیسی باشد.",
    },
  }).notOneOf(
    [Yup.ref("oldPassword")],
    "رمز عبور فعلی با رمز عبور جدید نمی‌تواند یکسان باشد."
  ),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "رمزهای عبور وارد شده با یکدیگر مطابقت ندارند."
    )
    .required("تکرار رمز عبور الزامی است."),

  firstName: typeCreator("نام", {
    required: true,
    min: 2,
    max: 32,
    matches: {
      reg: PERSIAN_REG,
      record: "باید با حروف فارسی باشد.",
    },
  }),
  lastName: typeCreator("نام خانوادگی", {
    required: true,
    min: 2,
    max: 32,
    matches: {
      reg: PERSIAN_REG,
      record: "باید با حروف فارسی باشد.",
    },
  }),

  // Phone Validations
  phoneNumber: Yup.string()
    .matches(PHONE_NUMBER_REG, "شماره همراه وارد شده صحیح نمی باشد.")
    .trim()
    .required("شماره همراه الزامی است."),
  code: Yup.string()
    .length(6, "کد تایید باید 6 حرف باشد.")
    .required("کد تایید الزامی است."),

  // currency
  money: Yup.number().required("مبلغ الزامی است."),

  // bitgap
  gapTitle: typeCreator("عنوان", { min: 3, trim: true, required: true }),
  gapDescription: typeCreator("توضیحات", {
    min: 3,
    trim: true,
    required: true,
  }),

  // profile
  fatherName: typeCreator("نام پدر", {
    required: true,
    min: 2,
    max: 32,
    matches: {
      reg: PERSIAN_REG,
      record: "باید با حروف فارسی باشد.",
    },
  }),
  nationalCode: typeCreator("کد ملی", {
    required: true,
    test: validateNationalCode,
  }),
  birthDate: Yup.date().required("تاریخ تولد الزامی است."),

  // coin
  // coin: typeCreator("ارز", { required: true }),
  coin: Yup.mixed().required("ارز الزامی است."),
  // coinNetwork: typeCreator("شبکه ارز", { required: true }),
  coinNetwork: Yup.mixed().required("شبکه ارز الزامی است."),
  coinAddress: (regExp?: RegExp) =>
    typeCreator("آدرس ارزی", {
      required: true,
      matches: regExp
        ? { reg: regExp, record: "آدرس ارزی وارد شده اشتباه است." }
        : undefined,
    }),
  coinTag: (regExp?: RegExp) =>
    typeCreator("تگ یا ممو", {
      matches: regExp
        ? { reg: regExp, record: "تگ یا ممو وارد شده اشتباه است." }
        : undefined,
    }),
  coinTitle: typeCreator("عنوان", { max: 64 }),
  // wallet
  iban: typeCreator("شماره شبا", { required: true }),
  card: typeCreator("کارت بانکی", { required: true }),
  cardNumber: typeCreator("کارت بانکی", {
    required: true,
    test: validateCardNumber,
  }),
  // userComment
  message: typeCreator("پیام", { min: 4, max: 512, required: true }),

  // assets
  coinAmount: typeCreator("مقدار ارز", {
    type: "number",
    required: true,
  }).moreThan(0, "مقدار ارز باید بیشتر از ۰ باشد."),

  coinAmountMax: (max: number, ref: string) =>
    Yup.number()
      .when(ref, {
        is: true,
        then: Yup.number().max(
          max,
          "مقدار فروش نمی‌تواند بیشتر از دارایی فعلی باشد."
        ),
      })
      .moreThan(0, "مقدار ارز باید بیشتر از ۰ باشد.")
      .required("مقدار ارز الزامی است."),

  coinPrice: typeCreator("مقدار وجه دریافتی", {
    type: "number",
    required: true,
  }),
  price: typeCreator("قیمت", {
    type: "number",
    min: 0,
    required: true,
  }),

  //
  requiredDescription: typeCreator("توضیحات", {
    min: 10,
    max: 256,
    required: true,
  }),
  orderId: Yup.string()
    .length(8, "شماره سفارش ۸ رقمی است.")
    .required("شماره سفارش الزامی است."),
  nationalCardSerial: Yup.string()
    .matches(
      CARD_SERIAL_NUMBER_REG,
      "شماره سریال تنها میتواند شامل اعداد و حروف انگلیسی باشد"
    )
    .length(10, "شماره سریال ۱۰ رقمی است.")
    .required("شماره سریال الزامی است."),
};

export default yupSchema;

function validateCardNumber(num: number | string) {
  const arr = `${num}`.split("");
  const sumFormat = arr.reduce((prev, next, idx) => {
    let val = +next;
    if (!(idx % 2)) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    return prev + val;
  }, 0);
  return !(sumFormat % 10);
}
function validateNationalCode(code?: string) {
  if (!code || code.length < 10) return false;
  const arr = code.split("").reverse();
  const sumFormat = arr.reduce((prev, next, idx) => {
    if (!idx) return prev;
    const val = +next * (idx + 1);
    return prev + val;
  }, 0);
  const remain = sumFormat % 11;
  if (remain < 2) return remain === +arr[0];
  return 11 - remain === +arr[0];
}
