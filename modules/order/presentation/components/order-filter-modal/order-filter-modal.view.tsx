import AppDialogComponent from "@/core/components/common/app-dialog";
import {
  Typography,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  ButtonBase,
} from "@mui/material";
import styles from "./order-filter-modal.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { OrderType } from "@/core/enums/order.enums";
import clsx from "clsx";
import { FilterType } from "../../pages/orders/orders.view";
import { useMemo } from "react";
import { OrderStatus } from "@/modules/order/domain/entities/order";

type PropTypes = {
  open: boolean;
  onClose: () => void;

  handleStatusChange: (status: OrderStatus["id"]) => void;
  handleTypeChange: (type: OrderType | "all") => void;

  status: OrderStatus["id"][];
  type?: OrderType;
  submit: () => void;
  filterType?: FilterType;
  orderStatuses: OrderStatus[];
};

export default function OrderFilterModalView(props: PropTypes) {
  const {
    open,
    onClose,
    handleStatusChange,
    handleTypeChange,
    status,
    type,
    submit,
    filterType,
    orderStatuses,
  } = props;
  const title = useMemo(() => {
    switch (filterType) {
      case FilterType.Type:
        return "نوع سفارش";
      case FilterType.Status:
        return "وضعیت سفارش";
      default:
        return "فیلتر سفارشات";
    }
  }, [filterType]);
  return (
    <AppDialogComponent
      open={open}
      onClose={onClose}
      mobileStyle={4}
      className={styles.modal}
      contentClassName={styles.container}
      headerClassName="d-none"
    >
      <div className={styles.header}>
        <Typography className={styles.title}>{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      {(!filterType || filterType === FilterType.Type) && (
        <div className={styles.section}>
          {!filterType && (
            <Typography className={styles.title}>نوع سفارش</Typography>
          )}
          <ToggleButtonGroup
            color="standard"
            fullWidth
            value={type || "all"}
            exclusive
            onChange={(_, val) => handleTypeChange(val !== null ? val : type)}
            size="small"
            // sx={{ border: "none" }}
          >
            <ToggleButton value={"all"}>همه</ToggleButton>
            <ToggleButton value={OrderType.Buy}>خرید</ToggleButton>
            <ToggleButton value={OrderType.Sell}>فروش</ToggleButton>
          </ToggleButtonGroup>
        </div>
      )}

      {(!filterType || filterType === FilterType.Status) && (
        <div className={styles.section}>
          {!filterType && (
            <Typography className={styles.title}>وضعیت سفارش</Typography>
          )}
          <div className={styles.scrollable}>
            <div className={styles.chipsContainer}>
              {orderStatuses.map(({ title, id }) => (
                <ButtonBase
                  key={id}
                  onClick={() => handleStatusChange(id)}
                  className={clsx({
                    [styles.chip]: true,
                    [styles.selected]: status.includes(id),
                  })}
                >
                  <Typography component="span">{title}</Typography>
                </ButtonBase>
              ))}
            </div>
          </div>
        </div>
      )}
      <Button onClick={submit} variant="contained" fullWidth>
        فیلتر کن
      </Button>
    </AppDialogComponent>
  );
}
