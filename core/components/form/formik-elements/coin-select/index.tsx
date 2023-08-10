import React, { useMemo, useState } from "react";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import CoinSelectComponent, { CoinSelectProps } from "../../coin-select";
import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";

function CoinSelect(
  props: CoinSelectProps & {
    field: FieldInputProps<any>;
    form: FormikProps<FormikValues>;
  }
) {
  const {
    form: { values, setFieldValue },
    field: { name },
    onChange,
    ...other
  } = props;

  const handleChange = (coin: CoinDataInterface) => {
    if (onChange) onChange(coin);
    setFieldValue(name, coin.shortName);
  };

  return (
    <CoinSelectComponent
      {...props}
      value={values[name]}
      onChange={handleChange as any}
      {...other}
    />
  );
}

CoinSelect.defaultProps = {
  form: {},
  field: {},
};

export default function FCoinSelect(
  props: CoinSelectProps & { name?: string; fast?: boolean }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: CoinSelect,
    ...other,
  };

  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
