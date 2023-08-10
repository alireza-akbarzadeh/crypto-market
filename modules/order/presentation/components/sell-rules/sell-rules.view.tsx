import { SellStepsData } from "@/modules/order/domain/entities/order";
import styles from "../../utils/purchasing-steps.module.scss";
import { Typography, Button, Paper, Alert } from "@mui/material";
import DoubleForwardIcon from "@/core/components/common/custom-icon/double-forward";
import clsx from "clsx";

type PropTypes = {
  handlePrev: () => void;
  handleNext: () => void;
  data: SellStepsData;
};
export default function SellRulesView(props: PropTypes) {
  const { handlePrev, handleNext, data } = props;

  return (
    <section>
      <Typography
        component="h2"
        className={clsx(styles.stepTitle, "mobile-down")}
      >
        گام اول: پذیرش قوانین
      </Typography>
      <Paper className={styles.paper}>
        <Typography
          component="h2"
          className={clsx(styles.stepTitle, "mobile-up")}
        >
          <span className={styles.stepPart}>گام اول:</span> پذیرش قوانین
        </Typography>
        <div className={styles.rulesBox}>
          {data.rules.map((rule, idx) => (
            <Typography
              key={idx}
              className={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: rule }}
            />
          ))}
        </div>
        <Alert sx={{ my: { xs: 0, sm: 3 } }} severity="info" icon={null}>
          <Typography>
            با رفتن به مرحله بعدی، قوانین و شرایط استفاده را می‌پذیرید.
          </Typography>
        </Alert>

        <Paper className={styles.footer}>
          <Button onClick={handlePrev} variant="outlined">
            بازگشت
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            endIcon={<DoubleForwardIcon className={styles.buttonIcon} />}
          >
            مرحله بعد
          </Button>
        </Paper>
      </Paper>
    </section>
  );
}
