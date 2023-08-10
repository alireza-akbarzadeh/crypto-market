import React, { useMemo, useState } from "react";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import DefCodeInput, { CodeInputProps } from "../../code-input";

function CodeInput(
  props: CodeInputProps & {
    field: FieldInputProps<any>;
    form: FormikProps<FormikValues>;
  }
) {
  const {
    form: { errors, submitCount, values, setFieldValue },
    field: { name },
    onChange,
    ...other
  } = props;

  const errorText = getIn(errors, name);
  const hasError = Boolean(errorText && submitCount);
  const handleChange = (value: string) => {
    setFieldValue(name, value);
    if (onChange) onChange(value);
  };

  return (
    <DefCodeInput
      {...other}
      value={values[name]}
      onChange={handleChange}
      error={hasError ? errorText : ""}
    />
  );
}

CodeInput.defaultProps = {
  form: {},
  field: {},
};

export default function FCodeInput(
  props: CodeInputProps & { name?: string; fast?: boolean }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: CodeInput,
    ...other,
  };

  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
