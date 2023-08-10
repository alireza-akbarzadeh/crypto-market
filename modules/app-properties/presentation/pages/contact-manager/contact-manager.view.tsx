import styles from "./contact-manager.module.scss";

import { UserInterface } from "@/modules/auth/domain/entities/user";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { FTextField } from "@/core/components/form/formik-elements";
import { Form, Formik, FormikHelpers } from "formik";
import Image from "next/image";
import CONTACT_MANAGER from "@/public/images/contact-manager.png";
// import CONTACT_MANAGER from "@/public/images/contact-manager.svg";
import { UserCommentsFormValues } from "@/modules/app-properties/domain/entities/form-values";
import LoadingButton from "@/core/components/common/loading-button";
import InfiniteListComponent, {
  variableRowBuilder,
} from "@/core/components/common/infinite-list";
import CommentCardComponent from "../../components/comment-card";
import LoadingComponent from "@/core/components/common/loading";
import useContactUs from "@/modules/app-properties/domain/usecases/useContactUs";
import AppHeaderComponent from "@/core/components/layouts/app-header";

type PropTypes = {
  user?: UserInterface;
  onSubmit: (
    values: UserCommentsFormValues,
    helpers: FormikHelpers<UserCommentsFormValues>
  ) => void;
  openLoginModal: () => void;
  schema: any;
  userLoading: boolean;
};
export default function ContactManagerView(props: PropTypes) {
  const { user, onSubmit, openLoginModal, schema, userLoading } = props;
  return (
    <InfiniteListComponent
      variableSize
      {...{
        pageSize: 5,
        getHook: useContactUs,
        getItemData: (rows) => ({ user, rows }),
        itemSize: 119,
        Row,
      }}
    >
      {({ List, rows, isLoading }) => (
        <Box className={styles.root}>
          <AppHeaderComponent
            className={styles.pageHeader}
            title="ارتباط با مدیریت"
            backHref="/profile"
          />
          <Container>
            <div className={styles.paper}>
              <div className={styles.header}>
                <div className={styles.headImageWrapper}>
                  <Image src={CONTACT_MANAGER} />
                </div>
                <div className={styles.mainDesk}>
                  <Alert className={styles.alert} severity="info">
                    <Typography>
                      این بخش مستقیما توسط مدیریت کریپو بررسی میشود.
                    </Typography>
                  </Alert>
                  <Typography
                    className={styles.title}
                    variant="h4"
                    component="h2"
                  >
                    ارتباط با مدیریت
                  </Typography>
                  <Typography>
                    کارشناسان همه روزه حتی در ایام تعطیل بصورت شبانه روزی از
                    طریق تلفن و پیام رسان پاسخگوی سوالات شما عزیزان هستند در
                    صورتیکه از عملکرد پرسنل پشتیبانی و یاسایت انتقاد و شکایتی
                    داشتید می توانید از طریق فرم زیر دیدگاه خود را به اطلاع
                    مدیریت کریپو برسانید.
                  </Typography>
                </div>
              </div>

              {userLoading ? (
                <LoadingComponent />
              ) : user ? (
                <Formik
                  validationSchema={schema}
                  onSubmit={onSubmit}
                  initialValues={{ message: "" }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <FTextField
                        name="message"
                        multiline
                        rows={10}
                        placeholder={
                          "پیشنهادات، نظرات، شکایات و انتقادات خود را مطرح کنید..."
                        }
                        InputProps={{ className: styles.textarea }}
                      />

                      <div className={styles.buttonContainer}>
                        <LoadingButton
                          type="submit"
                          loading={isSubmitting}
                          className={styles.button}
                          variant="contained"
                        >
                          ثبت پیام
                        </LoadingButton>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <>
                  <Typography>
                    جهت ثبت گزارش خود، ابتدا وارد حساب کاربری کریپو شوید و سپس
                    اینجا را کلیک کنید.
                  </Typography>
                  <div className={styles.buttonContainer}>
                    <Button
                      onClick={openLoginModal}
                      className={styles.button}
                      variant="contained"
                    >
                      ورود به حساب کاربری
                    </Button>
                  </div>
                </>
              )}
              {!userLoading && (
                <>
                  {Boolean(rows.length) && (
                    <Typography className={styles.listTitle}>
                      پیام های شما
                    </Typography>
                  )}
                  {isLoading && <LoadingComponent />}
                  {Boolean(user) && List}
                </>
              )}
            </div>
          </Container>
        </Box>
      )}
    </InfiniteListComponent>
  );
}

const Row = variableRowBuilder(({ index, style, data, rowRef }) => {
  const { rows } = data;
  return (
    <div style={style}>
      <div ref={rowRef} className={styles.cardWrapper}>
        <CommentCardComponent variant="outlined" data={rows[index]} />
      </div>
    </div>
  );
});
