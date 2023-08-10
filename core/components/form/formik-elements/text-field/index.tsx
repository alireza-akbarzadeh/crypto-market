import React, { useMemo, useState } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import PhoneInput from "./phone-input";
import CodeInput from "./code-input";
import CurrencyInput from "./currency-input";
import Visibility from "@mui/icons-material/VisibilityOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOffOutlined";
import BankCardInput from "./bank-card-input";
import IbanInput from "./iban-input";
import NationalCodeInput from "./national-code-input";

export type TextFieldProps = MuiTextFieldProps & {
  field: FieldInputProps<any>;
  form: FormikProps<FormikValues>;
  length?: number;
};
function TextField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    form: { errors, submitCount, isSubmitting },
    field: { name, onChange: fieldOnChange, ...otherFields },
    length,
    type,
    InputProps: _InputProps = {},
    inputProps: _inputProps = {},
    disabled,
    onChange,
    helperText,
    ...other
  } = props;

  const _type = useMemo(() => {
    switch (type) {
      case "phoneNumber":
        return "tel";
      case "currency":
      case "code":
      case "bankCard":
      case "iban":
        return "text";
      default:
        return type;
    }
  }, [type]);

  const InputProps = useMemo(() => {
    switch (type) {
      case "phoneNumber":
        return { inputComponent: PhoneInput };
      case "code":
        return { inputComponent: CodeInput };
      case "currency":
        return { inputComponent: CurrencyInput };
      case "bankCard":
        return { inputComponent: BankCardInput };
      case "iban":
        return { inputComponent: IbanInput };
      case "nationalCode":
        return { inputComponent: NationalCodeInput };
      case "password":
        return {
          className: "align-left",
          type: showPassword ? "text" : "password",
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="start"
                tabIndex={-1}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        };
      default:
        return undefined;
    }
  }, [type, showPassword]) as any;
  const errorText = getIn(errors, name);
  const hasError = Boolean(errorText && submitCount);

  const handleChange = (e: any) => {
    fieldOnChange(e);
    if (onChange) onChange(e);
  };

  return (
    <MuiTextField
      name={name}
      error={hasError}
      helperText={hasError ? errorText : helperText}
      onChange={handleChange}
      autoComplete={(props as any).autocomplete || "off"}
      type={_type}
      InputProps={{ ...InputProps, ..._InputProps }}
      inputProps={{ length, ..._inputProps }}
      InputLabelProps={{ shrink: true }}
      disabled={disabled || isSubmitting}
      {...otherFields}
      {...other}
    />
  );
}

TextField.defaultProps = {
  form: {},
  field: {},
};

export default function FTextField(
  props: MuiTextFieldProps & {
    fast?: boolean;
    length?: number;
  }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: TextField,
    fullWidth: true,
    size: "small",
    margin: "normal",
    // margin: "dense",
    ...other,
  };
  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
