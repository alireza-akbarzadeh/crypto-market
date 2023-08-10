import {
  FTextField,
  FFilePicker,
} from "@/core/components/form/formik-elements";
import {
  TicketCategoryInterface,
  TicketFormValues,
} from "@/modules/support/domain/entities/ticket";
import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import styles from "./compose-ticket.module.scss";
import HistoryIcon from "@mui/icons-material/History";

type PropTypes = {
  category?: TicketCategoryInterface;
  onSubmit: (values: TicketFormValues) => void;
  handleOpenOrders: () => void;
  formikRef: any;
  schema: any;
};
export default function ComposeTicketView(props: PropTypes) {
  const { category, onSubmit, handleOpenOrders, formikRef, schema } = props;

  if (!category) return null;
  return (
    <Formik
      initialValues={{ description: "", file: undefined, orderId: "" }}
      onSubmit={onSubmit}
      innerRef={formikRef}
      validationSchema={schema}
    >
      {({ isSubmitting, errors }) => (
        <Form className={styles.root}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {category.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {category.description}
          </Typography>
          <FTextField
            name="description"
            multiline
            rows={6}
            placeholder="جزئیات مورد خود را اینجا بنویسید"
            label="جزئیات"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FFilePicker
            name="file"
            image
            variant="outlined"
            placeholder="جهت ارسال تصویر روی انتخاب فایل کلیک کنید."
          />
          {category.orderRequired && (
            <>
              <FTextField
                className={styles.codeInput}
                name="orderId"
                label="شماره سفارش"
                type="code"
                length={8}
                // fast={false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className={styles.buttonWrapper}>
                <Button
                  className={styles.button}
                  size="small"
                  onClick={handleOpenOrders}
                  endIcon={<HistoryIcon />}
                >
                  سفارش‌های اخیر
                </Button>
              </div>
            </>
          )}
          <Button
            sx={{ mt: 2 }}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            ثبت تیکت
          </Button>
        </Form>
      )}
    </Formik>
  );
}
