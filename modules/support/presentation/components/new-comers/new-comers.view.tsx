import SlideUp from "@/core/components/common/slide-up";
import { FaqInterface } from "@/modules/support/domain/entities/faq";
import { IconButton, List, Paper, Typography } from "@mui/material";
import SimpleListItemComponent from "../simple-list-item";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./new-comers.module.scss";

type PropTypes = {
  selected?: FaqInterface;
  setSelected: (item?: FaqInterface) => void;
  rows: FaqInterface[];
  handleScroll: (e: any) => void;
  isLoading: boolean;
};
export default function NewComersView(props: PropTypes) {
  const { selected, setSelected, handleScroll, rows, isLoading } = props;

  return (
    <div className={styles.listPage}>
      <Typography component="h3" sx={{ mb: 2 }}>
        موضوع مورد نظر خود را انتخاب کنید:{" "}
      </Typography>
      <div className={styles.listContainer} onScroll={handleScroll}>
        <List>
          {rows.map((item, i) => (
            <SimpleListItemComponent
              key={item.title}
              onClick={() => setSelected(item)}
              primary={item.title}
            />
          ))}
          {isLoading &&
            Array(20)
              .fill("")
              .map((_, idx) => <SimpleListItemComponent key={idx} />)}
        </List>
      </div>
      <SlideUp in={Boolean(selected)}>
        <div className={styles.faqModalContainer}>
          <Paper className={styles.faqModalPaper}>
            {selected && (
              <>
                <div className={styles.modalHeader}>
                  <Typography fontWeight={700}>{selected.title}</Typography>
                  <IconButton onClick={() => setSelected(undefined)} edge="end">
                    <CloseIcon />
                  </IconButton>
                </div>
                <Typography
                  className={styles.modalBody}
                  component="div"
                  dangerouslySetInnerHTML={{ __html: selected.message }}
                />
              </>
            )}
          </Paper>
        </div>
      </SlideUp>
    </div>
  );
}
