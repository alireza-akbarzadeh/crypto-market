import AppHeaderComponent from "@/core/components/layouts/app-header";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./kyc-national-card-serial.module.scss";
import NATIONAL_CARD_SERIAL from "@/public/images/national-card-serial.png";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { FTextField } from "@/core/components/form/formik-elements";
import LoadingButton from "@/core/components/common/loading-button";

type PropTypes = {
  hasCard: boolean;
  schema: any;
  onSubmit: (values: any) => void;
};
export default function KycNationalCardSerialView(props: PropTypes) {
  const { hasCard, schema, onSubmit } = props;
  return (
    <div className={styles.root}>
      <AppHeaderComponent
        title={hasCard ? "وارد کردن سریال کارت ملی" : "وارد کردن کد پیگیری"}
      />
      <Container maxWidth="sm">
        <Paper className={styles.paper}>
          <div className={clsx(!hasCard && "hidden")}>
            <div className={styles.imageWrapper}>
              <Image src={NATIONAL_CARD_SERIAL} />
            </div>

            <Typography component="h3" variant="h6" fontWeight={600}>
              شماره سریال پشت کارت ملی را وارد کنید
            </Typography>
            <Typography className={styles.desc}>
              دقت کنید که شماره سریال را به درستی وارد کنید
            </Typography>
          </div>
          <div className={clsx(hasCard && "hidden")}>
            <Typography component="h3" variant="h6" fontWeight={600}>
              شماره پیگیری کارت ملی را وارد کنید
            </Typography>
            <Typography className={styles.desc}>
              شماره پیگیری‌ جایگزینی که برای کارت ملی هوشمند دریافت کرده‌اید را
              وارد کنید.
            </Typography>
          </div>
          <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{ code: "" }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <FTextField
                  fullWidth
                  name="code"
                  label={hasCard ? "شماره سریال" : "شماره پیگیری"}
                />
                <LoadingButton
                  // onClick={openPictureModal}
                  className={styles.button}
                  // time={9}
                  loading={isSubmitting}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  ادامه
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
}
