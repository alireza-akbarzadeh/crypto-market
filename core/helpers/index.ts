import jwtDecode from "jwt-decode";
import { ChangeEvent, RefObject } from "react";
import Webcam from "react-webcam";
export function fixNumbers(str: string) {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];
  if (typeof str === "string"!) return str;

  for (let i = 0; i < 10; i++) {
    str = str
      .replace(persianNumbers[i], i.toString())
      .replace(arabicNumbers[i], i.toString());
  }

  return str;
}
export function currencyFormat(
  value?: number,
  label?: string,
  options: Intl.NumberFormatOptions = {
    maximumFractionDigits: 10,
  }
) {
  value = value || 0;
  if (label) return value.toLocaleString(undefined, options) + " " + label;
  return value.toLocaleString(undefined, options);
}
export function makeQueryString(obj?: { [key: string]: any }) {
  if (!obj) return;

  const _obj = { ...obj };
  Object.keys(_obj).forEach(
    (key) => (_obj[key] === undefined || _obj[key] === "") && delete _obj[key]
  );
  if (Object.keys(_obj).length === 0) return;

  const params = new URLSearchParams();

  Object.entries(_obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => params.append(key + "[]", value.toString()));
    } else {
      params.append(key, value.toString());
    }
  });

  return params.toString();

  // const params = new URLSearchParams(_obj);
  // return params.toString();

  // const str = [];
  // for (const p in obj) {
  //   if (obj.hasOwnProperty(p)) {
  //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  //   }
  // }
  // return str.join("&");
}
export function splitString(str?: string, length: number = 1, join?: string) {
  if (!str) return "";
  const parts = Math.ceil(str.length / length);
  const arr = Array(parts)
    .fill("")
    .map((_, i) => str.slice(i * length, (i + 1) * length));
  if (!join) return arr;
  return arr.join(join);
}
export function parseString(
  str: string,
  firstLength: number,
  lastLength: number = 0,
  endWidth: string = "..."
) {
  const length = str.length;
  if (firstLength + lastLength >= length) return str;
  const firstPart = str.slice(0, firstLength);
  const lastPart = lastLength ? str.slice(length - lastLength) : "";
  return firstPart + endWidth + lastPart;
}

export function formatNum(num: number, length = 2) {
  return ("0" + num).slice(-length);
}

export function calculateTimeLeft(date: Date | string) {
  const difference = new Date(date).getTime() - Date.now();
  if (difference > 0) {
    // return {
    //   minutes: formatNum(Math.floor(difference / 1000 / 60)),
    //   seconds: formatNum(Math.floor((difference / 1000) % 60)),
    // };
    return `${formatNum(Math.floor(difference / 1000 / 60))}:${formatNum(
      Math.floor((difference / 1000) % 60)
    )}`;
  }
}

export function mergeRefs(...refs: any) {
  return (ref: any) => {
    refs.forEach((possibleRef: any) => {
      if (typeof possibleRef === "function") {
        possibleRef(ref);
        return;
      }
      possibleRef.current = ref;
    });
  };
}
export function toFormData(obj: { [key: string]: any }) {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (!value) return;
    formData.append(key, value);
  });
  return formData;
}
export function b64toBlob(b64Data: string) {
  return fetch(b64Data).then((res) => res.blob());
}
export async function getScreenShot(webcamRef: RefObject<Webcam>) {
  if (!webcamRef?.current) return;
  const imageSrc = webcamRef.current.getScreenshot();
  if (!imageSrc) return;
  const blob = await b64toBlob(imageSrc);
  const blobUrl = URL.createObjectURL(blob);

  // const a = document.createElement("a");
  // document.body.appendChild(a);
  // (a.style as any) = "display: none";
  // a.href = blobUrl;
  // a.download = "react-webcam-stream-capture.webp";
  // a.click();
  // window.URL.revokeObjectURL(blobUrl);

  return { blob, blobUrl };
}
export function currencyConverter(amount: number, ratio?: number) {
  ratio = ratio || 0;
  if (amount * ratio < 10) {
    return Math.round(amount * ratio * 10000) / 10000;
  }
  // return Math.round(amount * ratio * 10000) / 10000;
  // return Math.round(amount * ratio * 10000) / 10000;
  return Math.round(amount * ratio);
}
export function handleSmoothScroll(e: any) {
  const currentEl = e?.target;
  if (!currentEl?.getAttribute || !currentEl.getAttribute("href")) return;
  const targetEl = document.querySelector(e.target.getAttribute("href"));
  if (!targetEl || !targetEl.scrollIntoView) return;

  e.preventDefault();
  targetEl.scrollIntoView({
    behavior: "smooth",
  });
}
export function calcBankFee(val: number) {
  if (!val) return 1000;
  const fee = Math.ceil(val / 100);
  if (fee < 1000) return 1000;
  if (fee > 3000) return 3000;
  return fee;
}
export default function withMaxDecimal(num: number, decimal: number) {
  return Math.floor(num * 10 ** decimal) / 10 ** decimal;
}
export function ifFocused(
  callback: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  field: string
) {
  return (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (
      document.activeElement &&
      document.activeElement[field as keyof Element] !==
        e.target[field as keyof Element]
    )
      return;
    callback(e);
  };
}
export function getLocalStorageToken() {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem("token");
  if (!token) return;
  const decodedHeader: any = jwtDecode(token);
  if (!decodedHeader?.exp) return;
  if (decodedHeader.exp > Date.now() / 1000) return token;
}
export function ellipsis(str: string, maxLength: number = 100) {
  if (str.length <= maxLength) return str;
  const words = str.slice(0, 100).split(" ");
  words.pop();
  return words.join(" ") + "...";
}
export function numberAbbreviation(num: number) {
  if (num >= 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  }
  if (num >= 10000) {
    return Math.round(num / 100) / 10 + "K";
  }
  return currencyFormat(num);
}
