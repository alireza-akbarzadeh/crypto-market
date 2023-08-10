import React from "react";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
} from "react-number-format";

const NationalCodeInput = React.forwardRef<NumberFormat, NumberFormatProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, length, ...other } = props;

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
        allowLeadingZeros
        decimalScale={0}
        allowNegative={false}
        format="##########"
        mask=""
        style={{ direction: "ltr" }}
      />
    );
  }
);

export default NationalCodeInput;
