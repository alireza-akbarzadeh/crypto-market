import styles from "./users-comments.module.scss";
import { Alert, Box, Button, Container, Fab } from "@mui/material";

import { Form, Formik, FormikHelpers } from "formik";
import { FTextField } from "@/core/components/form/formik-elements";
import { UserCommentsFormValues } from "@/modules/app-properties/domain/entities/form-values";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import CommentCardComponent from "../../components/comment-card";
import InfiniteListComponent, {
  variableRowBuilder,
} from "@/core/components/common/infinite-list";
import useComments from "@/modules/app-properties/domain/usecases/useComments";
import LoadingButton from "@/core/components/common/loading-button";
import LoadingComponent from "@/core/components/common/loading";
import EditIcon from "@mui/icons-material/Edit";
import AppHeaderComponent from "@/core/components/layouts/app-header";

type PropTypes = {
  onSubmit: (
    values: UserCommentsFormValues,
    helper: FormikHelpers<UserCommentsFormValues>
  ) => void;
  schema: any;
  user?: UserInterface;
  userLoading: boolean;
  openCommentModal: () => void;
};
export default function UsersCommentsView(props: PropTypes) {
  const { onSubmit, schema, user, userLoading, openCommentModal } = props;

  if (userLoading) return <LoadingComponent page />;
  return (
    <InfiniteListComponent
      variableSize
      {...{
        pageSize: 15,
        getHook: useComments,
        getItemData: (rows) => ({ user, rows }),
        itemSize: 119,
        Row,
      }}
    >
      {({ List, rows, isLoading }) => (
        <div className={styles.root}>
          <AppHeaderComponent title="نظرات کاربران" backHref="/profile" />
          <div className={styles.container}>
            <Container>
              {!user ? (
                <div className={styles.alertWrapper}>
                  <Alert severity="info" icon={false}>
                    برای ثبت تجربه خود از کریپو، ابتدا وارد سایت شوید.
                  </Alert>
                </div>
              ) : (
                <>
                  <Fab
                    onClick={openCommentModal}
                    color="primary"
                    size="medium"
                    className={styles.composeBtn}
                  >
                    <EditIcon className={styles.composeIcon} />
                  </Fab>
                  <div className={styles.formWrapper}>
                    <Formik
                      validationSchema={schema}
                      onSubmit={onSubmit}
                      initialValues={{ message: "" }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <FTextField
                            name="message"
                            placeholder="تجربه خود از کریپو را در اینجا به اشتراک بگذارید."
                            rows={5}
                            multiline
                          />
                          <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            className={styles.submitButton}
                            variant="contained"
                          >
                            ثبت نظر
                          </LoadingButton>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </>
              )}
              <div className={styles.listContainer}>{List}</div>
            </Container>
          </div>
        </div>
      )}
    </InfiniteListComponent>
  );
}

const Row = variableRowBuilder(({ index, style, data, rowRef }) => {
  const { rows } = data;
  return (
    <div style={style}>
      <div ref={rowRef} className={styles.cardWrapper}>
        <CommentCardComponent data={rows[index]} />
      </div>
    </div>
  );
});
