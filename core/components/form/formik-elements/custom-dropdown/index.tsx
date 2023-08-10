import React from "react";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import DefaultCustomDropdown, {
  CustomDropDownProps,
} from "../../custom-dropdown";

function CustomDropdown<T, V>(
  props: CustomDropDownProps<T, V> & {
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
  return (
    <DefaultCustomDropdown
      value={values[name]}
      onChange={(value: any) => setFieldValue(name, value)}
      {...other}
      error={hasError}
      helperText={errorText}
    />
  );
}

CustomDropdown.defaultProps = {
  form: {},
  field: {},
};

export default function FCustomDropdown<T, V>(
  props: CustomDropDownProps<T, V> & { name?: string; fast?: boolean }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: CustomDropdown,
    ...other,
  };

  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
