import { TextField, FormHelperText } from "@mui/material";
import clsx from "clsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./CodeInput.module.scss";
export type CodeInputProps = {
  length?: number;
  onChange?: (val: string) => void;
  value?: string;
  error?: string;
};
export default function CodeInput(props: CodeInputProps) {
  const { length = 5, onChange, value, error } = props;

  const [_value, _setValue] = useState("");
  const inputsRef = useRef<any>([]);

  useEffect(() => {
    _setValue(value || "");
  }, [value]);

  const handleValueChange = (val: string) => {
    _setValue(val);
    if (onChange) onChange(val);
  };
  const goToField = (index: number) => {
    if (index < 0) return;
    if (index === length) {
      inputsRef.current[index - 1].blur();
      return;
    }
    const ref = inputsRef.current[index];
    ref.focus();
    ref.setSelectionRange(0, ref.value.length);
  };
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (!event.target.value) {
      handleValueChange(_value.slice(0, index));
      return;
    }
    if (isNaN(+event.target.value)) {
      return;
    }
    let newValue =
      _value.slice(0, index) + event.target.value + _value.slice(index + 1);
    newValue = newValue.slice(0, length);
    handleValueChange(newValue);
    goToField(index + 1 > newValue.length ? newValue.length : index + 1);
    // goToField(index + 1);
  };

  const handleFocus = (e: any) => {
    e.target.setSelectionRange(0, e.target.value.length);
  };
  const handleKeyDown = (e: any, index: number) => {
    // number
    if (e.keyCode <= 57 && e.keyCode >= 48) {
      e.target.value = e.key;
      handleChange(e, index);
      e.preventDefault();
    }
    // backspace
    if (e.keyCode === 8) {
      if (e.target.value) return;
      e.preventDefault();
      let newValue = _value.slice(0, index - 1) + _value.slice(index + 1);
      handleValueChange(newValue);
      goToField(index - 1);
    }
  };

  return (
    <div className={styles.root}>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={_value}
        onChange={(e) => _setValue(e.target.value)}
        hidden
        style={{ display: "none" }}
      />
      <div className={styles.container}>
        {Array(length)
          .fill("")
          .map((_, i) => (
            <TextField
              inputRef={(el) => (inputsRef.current[i] = el)}
              className={clsx({
                [styles.inputContainer]: true,
                [styles.fill]: Boolean(_value[i] && !error),
              })}
              key={i}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              value={_value[i] || ""}
              onFocus={handleFocus}
              error={Boolean(error)}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              InputProps={{ sx: { borderColor: "primary.main" } }}
            />
          ))}
        {error && (
          <FormHelperText className={styles.errorText} error>
            {error}
          </FormHelperText>
        )}
      </div>
      {error && (
        <FormHelperText className={styles.errorTextMock} error>
          {error}
        </FormHelperText>
      )}
    </div>
  );
}
