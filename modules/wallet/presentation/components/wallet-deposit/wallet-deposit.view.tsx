import styles from "../../utils/wallet-sections.module.scss";
import { Box, Button, Typography, Grid, Container, Alert } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { calcBankFee, currencyFormat, splitString } from "@/core/helpers";
import {
  FCustomDropdown,
  FTextField,
} from "@/core/components/form/formik-elements";
import Image from "next/image";
import { BankCardInterface } from "@/modules/profile/domain/entities/bank-card";
import LoadingButton from "@/core/components/common/loading-button";
import clsx from "clsx";
import { UserInterface } from "@/modules/auth/domain/entities/user";

type PropTypes = {
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  schema: any;
  cards?: BankCardInterface[];
  user?: UserInterface;
  openUpdateProfile: () => void;
};
export default function WalletDepositView(props: PropTypes) {
  const { onSubmit, schema, cards, user, openUpdateProfile } = props;
  return (
    <Container sx={{ p: 0 }} maxWidth="xs">
      {user && !user.kycSim && (
        <div className={styles.alert}>
          <Typography>
            برای افزایش موجودی کیف پول خود ابتدا باید اطلاعات کاربری خود را
            تکمیل کنید.
          </Typography>
          <Button onClick={openUpdateProfile}>تکمیل اطلاعات کاربری</Button>
        </div>
      )}

      <Formik
        validationSchema={schema}
        initialValues={{ amount: "", card: "" }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form
            className={clsx({
              [styles.form]: true,
              [styles.disabled]: !user?.kycSim,
            })}
          >
            <FTextField
              name="amount"
              label="مبلغ واریزی به تومان"
              InputLabelProps={undefined}
              type="currency"
              className="text-center"
              helperText={`کارمزد درگاه بانکی ${currencyFormat(
                calcBankFee(+values.amount)
              )} تومان`}
            />
            <FCustomDropdown
              name="card"
              options={cards || []}
              optionRenderer={(o) => (
                <>
                  <div className={styles.dropdownImage}>
                    <Image src={o.image} alt="" width={40} height={40} />
                  </div>
                  <Typography className="text-ellipsis" sx={{ px: 1, flex: 1 }}>
                    {o.origin}
                  </Typography>
                  <Typography className="ltr">
                    {splitString(o.cardNumber, 4, " ")}
                  </Typography>
                </>
              )}
              inputContentRenderer={(o) => (
                <>
                  <div className={styles.dropdownImage}>
                    <Image src={o.image} alt="" width={40} height={40} />
                  </div>
                  <Typography className="ltr" sx={{ px: 1 }}>
                    {splitString(o.cardNumber, 4, " ")}
                  </Typography>
                </>
              )}
              valueSelector={(o) => o.id}
              placeholder="انتخاب کارت بانکی"
              fast={false}
            />
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={isSubmitting}
              className={styles.submitButton}
            >
              پرداخت
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
