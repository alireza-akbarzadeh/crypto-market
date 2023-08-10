import styles from "../../utils/wallet-sections.module.scss";

import {
  Box,
  Typography,
  Container,
  InputAdornment,
  Button,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import {
  FCustomDropdown,
  FTextField,
} from "@/core/components/form/formik-elements";
import Image from "next/image";
import { splitString } from "@/core/helpers";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import LoadingButton from "@/core/components/common/loading-button";
import clsx from "clsx";

type PropTypes = {
  ibans?: IbanInterface[];
  schema: any;
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void;
  handleAlert: (e: any, iban: IbanInterface) => void;
  balance?: number;
};
export default function WalletWithdrawView(props: PropTypes) {
  const { schema, onSubmit, ibans, handleAlert, balance } = props;

  return (
    <Container sx={{ p: 0 }} maxWidth="xs">
      <Formik
        validationSchema={schema}
        initialValues={{ amount: "", iban: "" }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form className={styles.form}>
            <FTextField
              name="amount"
              label="مبلغ برداشت به تومان"
              type="currency"
              className="text-center"
              // inputProps={{ disableSuffix: true }}
              InputLabelProps={undefined}
              InputProps={
                balance && !values.amount
                  ? {
                      endAdornment: (
                        <InputAdornment
                          className={styles.sortButtonWrapper}
                          position="end"
                        >
                          <Button
                            onClick={() => setFieldValue("amount", balance)}
                            sx={{ mr: -1.25, height: 40 }}
                          >
                            کل موجودی
                          </Button>
                        </InputAdornment>
                      ),
                    }
                  : undefined
              }
            />
            <FCustomDropdown
              name="iban"
              options={ibans || []}
              optionRenderer={(o) => (
                <Box
                  onClick={(e) => handleAlert(e, o)}
                  className={clsx({
                    [styles.dropdownWrapper]: true,
                    [styles.disabled]: o.alert,
                  })}
                >
                  <div className={styles.dropdownImage}>
                    <Image src={o.image} alt="" width={40} height={40} />
                  </div>
                  <Typography className="text-ellipsis" sx={{ px: 1, flex: 1 }}>
                    {o.origin}
                  </Typography>
                  <Typography variant="body2">
                    {splitString(o.iban, 4, " ")}
                  </Typography>
                </Box>
              )}
              inputContentRenderer={(o) => (
                <>
                  <div className={styles.dropdownImage}>
                    <Image src={o.image} alt="" width={40} height={40} />
                  </div>
                  <Typography sx={{ px: 1 }} variant="body2">
                    {splitString(o.iban, 4, " ")}
                  </Typography>
                </>
              )}
              valueSelector={(o) => o.id}
              placeholder="انتخاب شبای بانکی"
              fast={false}
            />
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={isSubmitting}
              className={styles.submitButton}
            >
              ثبت درخواست
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
