import React from "react";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
} from "react-number-format";

const CurrencyInput = React.forwardRef<NumberFormat, NumberFormatProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, disableSuffix, decimalScale, ...other } = props;

    const handleChange = (values: NumberFormatValues) => {
      if (!onChange) return;
      const event = { target: { name: props.name, value: values.value } };
      onChange(event as any);
    };

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={handleChange}
        thousandSeparator
        isNumericString
        decimalScale={decimalScale || 0}
        allowNegative={false}
        allowLeadingZeros={false}
        suffix={disableSuffix ? "" : " تومان"}
        style={disableSuffix ? { direction: "ltr" } : undefined}
        inputMode={decimalScale ? "decimal" : "numeric"}
      />
    );
  }
);

export default CurrencyInput;
