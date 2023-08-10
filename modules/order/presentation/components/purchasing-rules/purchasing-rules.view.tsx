import styles from "../../utils/purchasing-steps.module.scss";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import DoubleForwardIcon from "@/core/components/common/custom-icon/double-forward";
import clsx from "clsx";
import { PurchaseStepsData } from "@/modules/order/domain/entities/order";

type PropTypes = {
  handlePrev: () => void;
  handleNext: () => void;
  accepted: boolean;
  dirty: boolean;
  toggleAccepted: () => void;
  data: PurchaseStepsData;
};
export default function PurchasingRulesView(props: PropTypes) {
  const { accepted, toggleAccepted, handlePrev, handleNext, dirty, data } =
    props;

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
        {/* <FormControlLabel
          control={<Checkbox />}
          label="قوانین فوق را خوانده‌ام و می‌پذیرم."
          value={accepted}
          onChange={toggleAccepted}
        /> */}
        {/* <FormHelperText
          className={styles.helperText}
          error
          sx={{ opacity: dirty && !accepted ? 1 : 0 }}
        >
          جهت ادامه فرایند خرید،پذیرش قوانین الزامی است.
        </FormHelperText> */}

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
