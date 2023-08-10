import styles from "./custom-snackbar.module.scss";
import React, { useState, forwardRef, useCallback } from "react";
import classnames from "classnames";
import { useSnackbar, SnackbarContent } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Card,
  Paper,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";

type PropTypes = any;
export default function CustomSnackbarView(props: PropTypes) {
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);
  return (
    <SnackbarContent ref={props.refObj} className={styles.root}>
      <Card className={styles.card}>
        <CardActions classes={{ root: styles.actionRoot }}>
          <Typography variant="subtitle2" className={styles.typography}>
            {props.message}
          </Typography>
          <div className={styles.icons}>
            <IconButton
              aria-label="Show more"
              className={classnames(styles.expand, {
                [styles.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton className={styles.expand} onClick={handleDismiss}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </SnackbarContent>
  );
}
