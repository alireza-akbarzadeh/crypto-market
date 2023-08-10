import styles from "./date-picker.module.scss";
import { Button, FormHelperText, Grid } from "@mui/material";
import CustomDropdown from "../custom-dropdown";
import Dropdown from "../dropdown";

type PropTypes = {
  value?: Date;
  fieldChange: (field: "year" | "month" | "day", value: number) => void;
  valueObj: { year?: number; month?: number; day?: number };
  error?: string;
  helperText?: string;
  years: number[];
  months: { value: number; label: string }[];
  days: number[];
};
export default function DatePickerView(props: PropTypes) {
  const {
    value,
    fieldChange,
    valueObj,
    error,
    helperText,
    years,
    months,
    days,
  } = props;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Dropdown
            {...{
              options: days,
              onChange: (val) => fieldChange("day", val as number),
              value: valueObj.day || "",
              hasEmpty: true,
              label: "روز",
              InputLabelProps: { shrink: true },
              error: Boolean(error),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Dropdown
            {...{
              options: months,
              valueSelector: "value",
              labelSelector: "label",
              onChange: (val) => fieldChange("month", val as number),
              value: valueObj.month || "",
              hasEmpty: true,
              label: "ماه",
              InputLabelProps: { shrink: true },
              error: Boolean(error),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Dropdown
            {...{
              options: years,
              onChange: (val) => fieldChange("year", val as number),
              value: valueObj.year || "",
              hasEmpty: true,
              label: "سال",
              InputLabelProps: { shrink: true },
              error: Boolean(error),
            }}
          />
        </Grid>
      </Grid>
      {Boolean(error || helperText) && (
        <FormHelperText error={Boolean(error)}>
          {error || helperText}
        </FormHelperText>
      )}
    </>
  );
}
