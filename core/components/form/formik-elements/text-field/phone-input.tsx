import clsx from "clsx";
import React from "react";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
} from "react-number-format";

const PhoneInput = React.forwardRef<NumberFormat, NumberFormatProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, className, ...other } = props;

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
        isNumericString
        // allowEmptyFormatting
        allowLeadingZeros
        decimalScale={0}
        allowNegative={false}
        format="#### ### ####"
        mask=" "
        style={{ textAlign: "center" }}
        placeholder="09xx xxx xxxx"
        className={clsx("phone-input", className)}
      />
    );
  }
);

export default PhoneInput;
