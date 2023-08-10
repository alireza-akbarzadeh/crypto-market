import { ArrowBottomIcon } from "@/core/components/common/custom-icon";
import {
  Button,
  Collapse,
  Divider,
  Paper,
  Typography,
  ButtonBase,
  List,
  ListItem,
} from "@mui/material";
import clsx from "clsx";
import styles from "./career-collapse.module.scss";
import Link from "next/link";

type PropTypes = { open: boolean; toggleOpen: () => void };
export default function CareerCollapseView(props: PropTypes) {
  const { open, toggleOpen } = props;
  return (
    <Paper className={styles.root}>
      <ButtonBase className={styles.header} onClick={toggleOpen}>
        <Typography className={styles.mainTitle} component="span" variant="h6">
          محصول
        </Typography>
        <Typography component="span" color="secondary">
          Product
        </Typography>
        <ArrowBottomIcon
          color="secondary"
          className={clsx({
            [styles.collapseIcon]: true,
            [styles.open]: open,
          })}
        />
      </ButtonBase>
      <Collapse in={open}>
        <Divider />
        <List className={styles.list}>
          <ListItem>
            <Typography variant="h6" component="span" color="secondary">
              مدیر محصول
            </Typography>
            <Typography color="secondary" component="span">
              (product manager)
            </Typography>
            <Link href="/careers/id">
              <Button size="small" className={styles.more}>
                بیشتر
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Typography variant="h6" component="span" color="secondary">
              طراح گرافیک
            </Typography>
            <Typography color="secondary" component="span">
              (graphic designer)
            </Typography>
            <Link href="/careers/id">
              <Button size="small" className={styles.more}>
                بیشتر
              </Button>
            </Link>
          </ListItem>
        </List>
      </Collapse>
    </Paper>
  );
}
