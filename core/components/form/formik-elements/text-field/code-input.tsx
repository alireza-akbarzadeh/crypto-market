import React, { useMemo } from "react";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
} from "react-number-format";

const CodeInput = React.forwardRef<NumberFormat, NumberFormatProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, length, ...other } = props;

    const handleChange = (values: NumberFormatValues) => {
      if (!onChange) return;
      const event = { target: { name: props.name, value: values.value } };
      onChange(event as any);
    };
    const format = useMemo(() => {
      return new Array(length || 6).fill("#").join("");
    }, [length]);

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={handleChange}
        isNumericString
        allowEmptyFormatting
        allowLeadingZeros
        decimalScale={0}
        allowNegative={false}
        format={format}
        // mask="_ "
        mask="_&#8202;"
        style={{ textAlign: "center", direction: "ltr" }}
      />
    );
  }
);

export default CodeInput;
