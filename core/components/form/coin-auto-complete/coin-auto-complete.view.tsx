import { WalletAddressCoinInterface } from "@/modules/wallet/domain/entities/coin";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { padding } from "@mui/system";
import LoadingComponent from "../../common/loading";
import FakeInputComponent from "./fake-input";
import styles from "./coin-auto-complete.module.scss";
import { forwardRef, useMemo } from "react";
import Image from "next/image";
import clsx from "clsx";

type PropTypes = {
  options: WalletAddressCoinInterface[];
  value?: WalletAddressCoinInterface;
  handleChange: (event: any, newValue: WalletAddressCoinInterface) => void;
  // handleInputChange: (e: any, text: string) => void;
  handleInputChange: (e: any) => void;
  loading: boolean;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  inputValue: string;
  error?: string;
  handleScroll: (e: any) => void;
};
export default function CoinAutoCompleteView(props: PropTypes) {
  const {
    options,
    value,
    handleChange,
    handleInputChange,
    loading,
    onOpen,
    onClose,
    isOpen,
    inputValue,
    error,
    handleScroll,
  } = props;

  const FakeInput = useMemo(() => {
    return forwardRef<any, any>((props, inputRef) => (
      <FakeInputComponent {...props} {...{ inputRef, coin: value }} />
    ));
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      getOptionLabel={({ shortName, enName, faName }) =>
        shortName + enName + faName
      }
      options={options}
      value={value || null}
      onChange={handleChange as any}
      inputValue={inputValue}
      className={styles.root}
      classes={{ inputRoot: styles.inputRoot }}
      onClose={onClose}
      onOpen={onOpen}
      disableClearable={Boolean(value)}
      isOptionEqualToValue={(option, value) => {
        return option.shortName === value?.shortName;
      }}
      noOptionsText={loading ? "در حال جستجو..." : "هیچ موردی یافت نشد."}
      renderInput={(params) => (
        <TextField
          {...params}
          label="انتخاب ارز"
          autoFocus={Boolean(value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          placeholder="جستجو در بین ارزها"
          value={inputValue}
          onChange={handleInputChange}
          error={!!error}
          helperText={error}
          // placeholder="ارز خود را انتخاب کنید"
          // inputProps={{ className: !isOpen && value ? "" : "ltr" }}
          InputProps={{
            ...params.InputProps,
            ...(!isOpen && value
              ? {
                  inputComponent: FakeInput,
                }
              : {}),
            // endAdornment: (
            //   <>
            //     {loading && <CircularProgress color="inherit" size={20} />}
            //     {params.InputProps.endAdornment}
            //   </>
            // ),
          }}
        />
      )}
      ListboxProps={{ onScroll: handleScroll, ref: null } as any}
      renderOption={(props, option) => {
        return (
          <li {...props} className={clsx(props.className, styles.listItem)}>
            <div className={styles.imageWrapper}>
              <Image src={option.icon} width={24} height={24} />
            </div>
            <Typography component="span" className={styles.title}>
              {option.faName}
            </Typography>
            <Typography component="span" className={styles.shortName}>
              {option.shortName}
            </Typography>
          </li>
        );
      }}
    />
  );
}
