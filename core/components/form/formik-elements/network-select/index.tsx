import React, { useMemo, useState } from "react";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import NetworkSelectComponent, {
  NetworkSelectProps,
} from "../../network-select";
import { NetworkBaseType } from "@/modules/wallet/domain/entities/coin";

function NetworkSelect<T extends NetworkBaseType>(
  props: NetworkSelectProps<T> & {
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

  const handleChange = (value: T) => {
    if (onChange) onChange(value);
    setFieldValue(name, value);
  };

  const errorText = getIn(errors, name);
  const hasError = Boolean(errorText && submitCount);
  return (
    <NetworkSelectComponent
      {...props}
      value={values[name]}
      onChange={handleChange as any}
      error={hasError ? errorText : ""}
      {...other}
    />
  );
}

NetworkSelect.defaultProps = {
  form: {},
  field: {},
};

export default function FNetworkSelect<T extends NetworkBaseType>(
  props: NetworkSelectProps<T> & { name?: string; fast?: boolean }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: NetworkSelect,
    ...other,
  };

  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
