import React, { useEffect, useMemo, useState } from "react";
import {
  FormHelperText,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemProps,
  OutlinedInput,
  Popover,
  Typography,
} from "@mui/material";
import styles from "./CustomDialog.module.scss";
import { ArrowBottomIcon } from "@/core/components/common/custom-icon";

export type CustomDropDownProps<T, V = any> = {
  value?: V;
  options: T[];
  optionRenderer: (option: T) => any;
  valueSelector: (option: T) => V;
  inputContentRenderer: (option: T) => any;
  placeholder?: string;
  onChange?: (option: T) => void;
  ListItemButtonProps?: ListItemButtonProps;
  ListItemProps?: ListItemProps;
  error?: boolean;
  helperText?: string;
};

export default function CustomDropdown<T>({
  value,
  options,
  optionRenderer,
  inputContentRenderer,
  valueSelector,
  placeholder = "انتخاب کنید",
  onChange,
  ListItemButtonProps = {},
  ListItemProps = {},
  error,
  helperText,
}: CustomDropDownProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | undefined>();

  useEffect(() => {
    setSelected(
      value ? options.find((o) => valueSelector(o) === value) : undefined
    );
  }, [value]);
  const popOverStyles = useMemo(() => {
    if (!anchorEl) return {};
    const maxHeight =
      window?.innerHeight - (anchorEl.offsetTop + anchorEl.clientHeight + 12);
    return {
      width: anchorEl.clientWidth,
      maxHeight: Math.max(maxHeight, 160),
      // minHeight: 100,
    };
  }, [anchorEl]);

  const handleOpen: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };
  const onClose = () => setIsOpen(false);
  const handleSelect = (option: T) => {
    if (onChange) onChange(valueSelector(option));
    onClose();
  };
  return (
    <div className={styles.root}>
      <div onClick={handleOpen} className={styles.inputWrapper}>
        <OutlinedInput
          error={error}
          inputProps={{ disabled: true }}
          fullWidth
          className={isOpen ? "Mui-focused" : ""}
          endAdornment={
            <InputAdornment position="end">
              <ArrowBottomIcon color="inherit" />
            </InputAdornment>
          }
        />
        <div className={styles.inputContent}>
          {selected ? (
            inputContentRenderer(selected)
          ) : (
            <Typography color="text.secondary">{placeholder}</Typography>
          )}
        </div>
      </div>
      {Boolean(helperText) && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        marginThreshold={12}
        PaperProps={{
          className: styles.paper,
          style: popOverStyles,
        }}
      >
        <List>
          {!options.length && (
            <ListItem {...ListItemProps}>
              <Typography component="div">موردی یافت نشد.</Typography>
            </ListItem>
          )}
          {options.map((option) => (
            <ListItem
              key={valueSelector(option)}
              disablePadding
              {...ListItemProps}
            >
              <ListItemButton
                onClick={() => handleSelect(option)}
                {...ListItemButtonProps}
              >
                {optionRenderer(option)}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}
