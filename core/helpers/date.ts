import moment from "moment-jalaali";

export function getTimeFormat(date: Date | string | number) {
  return moment(date).format("HH:mm");
}
export function toJalaali(date?: Date | string | number) {
  const d = moment(date);
  return {
    year: d.jYear(),
    month: d.jMonth() + 1,
    day: d.jDate(),
  };
}
export function toGregorian({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) {
  const m = moment(`${year}/${month}/${day}`, "jYYYY/jM/jD");
  return {
    year: m.year(),
    month: m.month(),
    day: m.date(),
  };
}
export function toGregorianDate(date: {
  year: number;
  month: number;
  day: number;
}) {
  const { year, month, day } = toGregorian(date);
  const d = new Date(year, month, day);
  if (d instanceof Date && !isNaN(d.getTime())) return d;
}
