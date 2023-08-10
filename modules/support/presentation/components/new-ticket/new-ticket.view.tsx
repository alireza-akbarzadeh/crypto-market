import LoadingComponent from "@/core/components/common/loading";
import { TicketCategoryInterface } from "@/modules/support/domain/entities/ticket";
import { List, Typography } from "@mui/material";
import SimpleListItemComponent from "../simple-list-item";
import styles from "./new-ticket.module.scss";

type PropTypes = {
  onSelect: (item: TicketCategoryInterface) => void;
  data: TicketCategoryInterface[];
  isLoading: boolean;
};
export default function NewTicketView(props: PropTypes) {
  const { onSelect, data, isLoading } = props;
  return (
    <div className={styles.listPage}>
      <Typography component="h3" sx={{ mb: 2 }}>
        موضوع مورد نظر خود را انتخاب کنید:{" "}
      </Typography>
      <div className={styles.listContainer}>
        <List>
          {isLoading
            ? Array(6)
                .fill("")
                .map((_, i) => <SimpleListItemComponent key={i} />)
            : data.map((item) => (
                <SimpleListItemComponent
                  key={item.title}
                  onClick={() => onSelect(item)}
                  primary={item.title}
                />
              ))}
        </List>
      </div>
      <Typography component="h3" sx={{ my: 2 }}>
        موضوع من در فهرست بالا نیست!
      </Typography>
      <div className={styles.listContainer}>
        <SimpleListItemComponent
          component="a"
          href="tel:02191079677"
          arrow={false}
          primary="تماس با پشتیبانی کریپو!"
        />
      </div>
    </div>
  );
}
