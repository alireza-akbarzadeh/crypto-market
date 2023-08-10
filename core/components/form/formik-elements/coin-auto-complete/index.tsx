import React, { useMemo, useState } from "react";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import CoinAutoCompleteComponent, {
  CoinAutoCompleteProps,
} from "../../coin-auto-complete";
import { WalletAddressCoinInterface } from "@/modules/wallet/domain/entities/coin";

function CoinAutoComplete(
  props: CoinAutoCompleteProps & {
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

  const handleChange = (value: WalletAddressCoinInterface) => {
    if (onChange) onChange(value);
    setFieldValue(name, value);
  };

  const errorText = getIn(errors, name);
  const hasError = Boolean(errorText && submitCount);
  return (
    <CoinAutoCompleteComponent
      // {...props}
      // value={values[name]}
      error={hasError ? errorText : ""}
      onChange={handleChange}
      {...other}
    />
  );
}

CoinAutoComplete.defaultProps = {
  form: {},
  field: {},
};

export default function FCoinAutoComplete(
  props: CoinAutoCompleteProps & { name?: string; fast?: boolean }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: CoinAutoComplete,
    ...other,
  };

  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
