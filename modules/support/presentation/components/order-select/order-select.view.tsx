import SlideUp from "@/core/components/common/slide-up";
import { SimpleOrderInterface } from "@/modules/support/domain/entities/order";
import { ButtonBase, Paper, Typography } from "@mui/material";
import OrderSelectItemComponent from "../order-select-item";
import styles from "./order-select.module.scss";

type PropTypes = {
  open: boolean;
  onSelect: (order: SimpleOrderInterface) => void;
  handleScroll: (e: any) => void;
  rows: SimpleOrderInterface[];
};
export default function OrderSelectView(props: PropTypes) {
  const { open, onSelect, handleScroll, rows } = props;
  return (
    <SlideUp in={open}>
      <Paper className={styles.modalContainer} sx={{ p: 2 }}>
        <Typography className={styles.title} variant="h6" fontWeight={500}>
          سفارش‌های اخیر
        </Typography>
        <div className={styles.content} onScroll={handleScroll}>
          <div className={styles.listContainer}>
            {rows.map((order) => (
              <OrderSelectItemComponent
                key={order.id}
                data={order}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </Paper>
    </SlideUp>
  );
}
