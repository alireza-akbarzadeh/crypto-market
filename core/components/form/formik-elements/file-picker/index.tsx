{
  /* <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" />; */
}

import React, { forwardRef, useMemo, useRef, useState } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  InputAdornment,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { FastField, Field, FormikProps, FormikValues, getIn } from "formik";
import { FieldInputProps } from "formik/dist/types";
import styles from "./FilePicker.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import clsx from "clsx";

export type FilePickerProps = MuiTextFieldProps & {
  field: FieldInputProps<any>;
  form: FormikProps<FormikValues>;
  image: boolean;
  accept: string;
};
const FileInput = forwardRef<any, any>(function FileInput(props, ref) {
  const { className, value, placeholder, ...other } = props;

  return (
    <Box component="label" className={styles.fileInput}>
      <Typography
        className={styles.fileInputLabel}
        component="div"
        whiteSpace="nowrap"
      >
        انتخاب فایل
      </Typography>
      <div className={clsx(styles.fakeInput, className)}>
        <Typography
          className={clsx({
            [styles.name]: true,
            [styles.placeholder]: !value,
          })}
          component="div"
          whiteSpace="nowrap"
        >
          {value || placeholder}
        </Typography>
        <input ref={ref} {...other} hidden />
      </div>
    </Box>
  );
});

function FilePicker(props: FilePickerProps) {
  const inputRef = useRef<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const {
    form: { errors, submitCount, setFieldValue },
    field: { name },
    autoComplete,
    type,
    image,
    accept,
    ...other
  } = props;

  const errorText = getIn(errors, name);
  const hasError = Boolean(errorText && submitCount);

  const handleChange = (e?: any) => {
    if (!e) {
      inputRef.current.value = "";
      setFileName("");
      setFieldValue(name, undefined);
      return;
    }
    const file = e.target.files[0];
    setFileName(file?.name || "");
    setFieldValue(name, e.target.files[0]);
  };

  return (
    <MuiTextField
      name={name}
      error={hasError}
      helperText={hasError ? errorText : ""}
      onChange={handleChange}
      value={fileName}
      type="file"
      InputProps={{
        sx: { pr: 0 },
        inputComponent: FileInput,
        endAdornment: fileName ? (
          <InputAdornment position="end">
            <IconButton onClick={() => handleChange()}>
              <DeleteIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      inputProps={{
        accept: image ? "image/png, image/gif, image/jpeg" : accept,
        ref: inputRef,
      }}
      {...other}
    />
  );
}

FilePicker.defaultProps = {
  form: {},
  field: {},
};

export default function FFilePicker(
  props: MuiTextFieldProps & {
    fast?: boolean;
    image?: boolean;
    accept?: string;
  }
) {
  const { fast, ...other } = props;
  const allProps = {
    component: FilePicker,
    fullWidth: true,
    size: "small",
    margin: "dense",
    ...other,
  };

  if (fast === false) {
    return <Field {...allProps} />;
  }
  return <FastField {...allProps} />;
}
