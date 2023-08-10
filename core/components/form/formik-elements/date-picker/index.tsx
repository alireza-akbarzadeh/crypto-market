import React, { useMemo, useState } from "react";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import DatePickerComponent, { DatePickerProps } from "../../date-picker";
function DatePicker(
  props: DatePickerProps & {
    field: FieldInputProps<any>;
    form: FormikProps<FormikValues>;
  }
) {
  const {
    form: { errors, submitCount, values, setFieldValue },
    field: { name },
    onChange,
    stringDate,
    ...other
  } = props;

  const errorText = getIn(errors, name);
  const hasError = Boolean(errorText && submitCount);
  const handleChange = (value?: Date, stringVal?: string) => {
    if (stringDate) {
      setFieldValue(name, stringVal);
      return;
    }
    setFieldValue(name, value);
  };
  return (
    <DatePickerComponent
      value={values[name]}
      onChange={handleChange}
      error={hasError ? errorText : ""}
      {...other}
    />
  );
}

DatePicker.defaultProps = {
  form: {},
  field: {},
};

export default function FDatePicker(
  props: DatePickerProps & { name?: string; fast?: boolean }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: DatePicker,
    ...other,
  };

  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
