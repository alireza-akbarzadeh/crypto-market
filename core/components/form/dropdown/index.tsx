import { useIsMobile } from "@/core/hooks";
import {
  Select,
  SelectProps,
  FormControl,
  InputLabel,
  MenuItem,
  InputLabelProps,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";

type OptionValue = string | number | readonly string[] | undefined;
type PropTypes<T, V = OptionValue> = {
  options: T[];
  valueSelector?: ((option: T) => V) | keyof T;
  labelSelector?: ((option: T) => string) | keyof T;
  onChange?: (value: V) => void;
  hasEmpty?: boolean;
  InputLabelProps?: InputLabelProps;
  error?: boolean;
} & SelectProps;
export default function Dropdown<T, V = OptionValue>(props: PropTypes<T, V>) {
  const {
    options,
    valueSelector,
    labelSelector,
    value,
    onChange,
    label,
    hasEmpty,
    InputLabelProps,
    error,
  } = props;
  const isMobile = useIsMobile();

  const _labelSelector = useMemo(() => {
    if (!labelSelector) return;
    if (typeof labelSelector === "function") {
      return labelSelector;
    }
    return (o: T) => o[labelSelector];
  }, [labelSelector]);
  const _valueSelector = useMemo(() => {
    if (!valueSelector) return;
    if (typeof valueSelector === "function") {
      return valueSelector;
    }
    return (o: T) => o[valueSelector];
  }, [valueSelector]);

  const Option = useMemo(() => {
    return isMobile ? "option" : MenuItem;
  }, [isMobile]);

  const handleChange = (e: any) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <FormControl fullWidth size="small" margin="dense" error={error}>
      <InputLabel id={"id-" + label} {...InputLabelProps}>
        {label}
      </InputLabel>
      <Select
        native={isMobile}
        value={value}
        onChange={handleChange}
        label={label}
        labelId={"id-" + label}
        input={<OutlinedInput notched label={label} />}
      >
        {hasEmpty && <Option />}
        {options.map((option) => {
          const value = _valueSelector ? _valueSelector(option) : option;
          return (
            <Option key={`${value}`} value={value as any}>
              {_labelSelector ? _labelSelector(option) : option}
            </Option>
          );
        })}
      </Select>
    </FormControl>
  );
}
