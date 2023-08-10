import { toGregorian, toGregorianDate } from "@/core/helpers/date";
import { useEffect, useState } from "react";
import DatePickerView from "./date-picker.view";
import { toJalaali } from "@/core/helpers/date";
import { useMemo } from "react";
import { formatNum } from "@/core/helpers";

const days = new Array(31).fill("").map((_, i) => i + 1);
const months = [
  { value: 1, label: "فروردین" },
  { value: 2, label: "اردیبهشت" },
  { value: 3, label: "خرداد" },
  { value: 4, label: "تیر" },
  { value: 5, label: "مرداد" },
  { value: 6, label: "شهریور" },
  { value: 7, label: "مهر" },
  { value: 8, label: "آبان" },
  { value: 9, label: "آذر" },
  { value: 10, label: "دی" },
  { value: 11, label: "بهمن" },
  { value: 12, label: "اسفند" },
];

export type DatePickerProps = {
  onChange?: (date?: Date, stringVal?: string) => void;
  value?: Date;
  error?: string;
  helperText?: string;
  stringDate?: boolean;
};
export default function DatePickerComponent(props: DatePickerProps) {
  const { onChange, helperText } = props;

  const [value, setValue] = useState<Date>();
  const [valueObj, setValueObj] = useState<{
    day?: number;
    month?: number;
    year?: number;
  }>({});
  const [error, setError] = useState<string>();
  const handleChange = (value?: Date, stringVal?: string) => {
    if (onChange) onChange(value, stringVal);
    setValue(value);
  };

  const fieldChange = (field: "day" | "month" | "year", value: number) => {
    const newValue = { ...valueObj, [field]: value };
    setValueObj(newValue);
    setError("");
    if (!newValue.day || !newValue.month || !newValue.year) {
      handleChange();
      return;
    }
    const date = toGregorianDate(newValue as any);
    const { day, month, year } = toGregorian(newValue as any);
    handleChange(date, `${year}-${formatNum(month + 1)}-${formatNum(day)}`);
    if (!date) {
      setError("تاریخ وارد شده صحیح نیست.");
    }
  };

  const years = useMemo(() => {
    const { year } = toJalaali();
    return new Array(55).fill("").map((_, i) => year - i - 18);
  }, []);
  return (
    <DatePickerView
      {...{
        value,
        fieldChange,
        valueObj,
        error: error || props.error,
        helperText,
        years,
        months,
        days,
      }}
    />
  );
}
