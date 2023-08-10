import styles from "../../utils/auth-modal.module.scss";
import { AuthModalStack } from "../../utils/enums";
import { useMemo } from "react";
import { Button } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowForwardIos";
import AppDialogComponent from "@/core/components/common/app-dialog";
import AuthContentComponent from "../auth-content";

type PropTypes = {
  current?: AuthModalStack;
  onBack: () => void;
  open: boolean;
  onClose: () => void;
  onPush: (route: AuthModalStack) => void;
  onReplace: (route: AuthModalStack) => void;
  onReset: () => void;
};
export default function AuthModalView(props: PropTypes) {
  const { current, onBack, open, onClose, onPush, onReplace, onReset } = props;

  const title = useMemo(() => {
    switch (current) {
      case AuthModalStack.LoginPassword:
      case AuthModalStack.LoginOtp:
        return "ورود";
      case AuthModalStack.RegisterOtp:
      case AuthModalStack.SetName:
      case AuthModalStack.SetPassword:
        return "ثبت نام";
      default:
        return "ورود / ثبت نام";
    }
  }, [current]);

  return (
    <AppDialogComponent
      className={styles.root}
      contentClassName={styles.content}
      maxWidth="sm"
      {...{
        open,
        onClose,
      }}
      renderClose={() => (
        <Button
          size="large"
          onClick={onBack}
          sx={{ px: 1 }}
          color="inherit"
          variant="text"
        >
          <BackIcon fontSize="small" />
          {title}
        </Button>
      )}
      logoHeader
    >
      <AuthContentComponent
        {...{ onBack, onPush, onReplace, onReset, current }}
      />
    </AppDialogComponent>
  );
}
