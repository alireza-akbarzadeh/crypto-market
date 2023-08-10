import { Paper, Typography } from "@mui/material";
import AuthContentComponent from "../../components/auth-content";
import { AuthModalStack } from "../../utils/enums";
import Image from "next/image";
import HEADER_LOGO from "@/public/images/header-logo.svg";
import styles from "./auth.module.scss";

type PropTypes = {
  current?: AuthModalStack;
  onBack: () => void;
  onPush: (route: AuthModalStack) => void;
  onReplace: (route: AuthModalStack) => void;
  onReset: () => void;
};
export default function AuthView(props: PropTypes) {
  const { current, onBack, onPush, onReplace, onReset } = props;
  return (
    <div className={styles.root}>
      <div className={styles.dialogPaper}>
        <div className={styles.header}>
          {/* {Boolean(title) && (
            <Typography
              className={styles.title}
              fontWeight={700}
              component="span"
            >
              {title}
            </Typography>
          )} */}
          <div className={styles.logo}>
            <Image src={HEADER_LOGO} />
          </div>
          {/* <div className={styles.closeIconWrapper}>
            <IconButton onClick={onClose as any} className="mobile-up">
              <CloseIcon />
            </IconButton>
            <div className="mobile-down">
              {renderClose ? (
                renderClose()
              ) : (
                <IconButton onClick={onClose as any}>
                  {mobileStyle === 2 ? <BackIcon /> : <CloseIcon />}
                </IconButton>
              )}
            </div>
          </div> */}
        </div>
        <div className={styles.content}>
          <div className={styles.blurBg} />

          <AuthContentComponent
            {...{ onBack, onPush, onReplace, onReset, current }}
          />
        </div>
      </div>
    </div>
  );
}
