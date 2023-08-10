import React from "react";
import {
  Dialog,
  DialogProps,
  IconButton,
  useMediaQuery,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import SlideUp from "../slide-up";
import CloseIcon from "@mui/icons-material/Close";
import BackIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./custom-dialog.module.scss";
import { useIsMobileSize } from "@/core/hooks";

type PropTypes = {
  title?: string;
  renderHeader?: (onClose: any) => React.ReactNode;
} & DialogProps;
export default function CustomDialogView(props: PropTypes) {
  const { onClose, title, children, renderHeader, ...other } = props;
  const fullScreen = useIsMobileSize();

  return (
    <Dialog
      fullScreen={fullScreen}
      TransitionComponent={fullScreen ? SlideUp : undefined}
      fullWidth
      onClose={onClose}
      {...other}
    >
      {renderHeader ? (
        renderHeader(onClose)
      ) : title ? (
        <Paper
          sx={{
            bgcolor: "background.paper",
            display: "flex",
            alignItems: "center",
            py: 1.5,
            px: 1,
          }}
        >
          <IconButton sx={{ position: "absolute" }} onClick={onClose as any}>
            <BackIcon fontSize="small" />
          </IconButton>
          <Typography
            sx={{ mx: "auto" }}
            component="h2"
            color="primary"
            fontWeight={700}
          >
            {title}
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", p: 1.5, pb: 0 }}
        >
          <IconButton onClick={onClose as any}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      {children}
    </Dialog>
  );
}
