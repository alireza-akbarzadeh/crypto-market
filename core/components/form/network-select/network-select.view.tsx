import { NetworkBaseType } from "@/modules/wallet/domain/entities/coin";
import { FormHelperText, Grid } from "@mui/material";
import clsx from "clsx";
import ToggleButtonComponent from "../toggle-button";
import styles from "./network-select.module.scss";
type PropTypes<T> = {
  options: T[];
  value?: T;
  error?: string;
  onChange: (network: T) => void;
  className?: string;
};
export default function NetworkSelectView<T extends NetworkBaseType = any>(
  props: PropTypes<T>
) {
  const { options, value, onChange, error, className } = props;
  return (
    <Grid container spacing={1} className={clsx(styles.root, className)}>
      {options.map((n) => (
        <Grid key={n.id} item xs={6}>
          <ToggleButtonComponent
            onClick={() => {
              if (!value || n.id !== value.id) onChange(n);
            }}
            selected={value && n.id === value.id}
            variant="containedLight"
            fullWidth
          >
            {n.network}
          </ToggleButtonComponent>
        </Grid>
      ))}
      {Boolean(error) && (
        <Grid item xs={12}>
          <FormHelperText
            // className={styles.helperText}
            error
          >
            {error}
          </FormHelperText>
        </Grid>
      )}
    </Grid>
  );
}
