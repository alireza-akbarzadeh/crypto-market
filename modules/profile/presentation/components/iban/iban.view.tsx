import styles from "../../utils/profile-sections.module.scss";
import {
  Button,
  IconButton,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Image from "next/image";
import { CopyIcon, TrashIcon } from "@/core/components/common/custom-icon";
import { splitString } from "@/core/helpers";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import { IbanStatus } from "@/core/enums/profile.enums";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import LoadingComponent from "@/core/components/common/loading";
import clsx from "clsx";
import EmptyContentComponent from "@/core/components/common/empty-content";

const ColorMap: any = {
  [IbanStatus.Accepted]: "success",
  [IbanStatus.NotAccepted]: "error",
  [IbanStatus.Pending]: "primary",
};
const StatusMap: any = {
  [IbanStatus.Accepted]: "تایید شده",
  [IbanStatus.NotAccepted]: "تایید نشده",
  [IbanStatus.Pending]: "در حال بررسی",
};
type PropTypes = {
  user: UserInterface;
  data: IbanInterface[];
  openIbanModal: () => void;
  copyToClipboard: (str: string) => void;
  deleteIban: (id: string) => void;
  isDesktopSize: boolean;
  loading: boolean;
};
export default function IbanView(props: PropTypes) {
  const {
    user,
    data,
    openIbanModal,
    copyToClipboard,
    deleteIban,
    isDesktopSize,
    loading,
  } = props;

  const isEmpty = !data.length && !loading;

  if (isDesktopSize) {
    if (isEmpty) {
      return (
        <EmptyContentComponent
          message="هنوز هیچ شبای بانکی ثبت نشده است."
          buttonProps={{ onClick: openIbanModal, label: "ثبت شبای جدید" }}
          className={styles.emptyContainer}
        />
      );
    }
    return (
      <div className={styles.propertiesDesktop}>
        <Button
          onClick={openIbanModal}
          className={styles.addButton}
          variant="dashed"
        >
          ثبت شبای جدید
        </Button>
        <Table className={styles.table}>
          <TableHead>
            <TableRow className={styles.headRow}>
              <TableCell>نام بانک</TableCell>
              <TableCell>شماره شبای بانکی</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell className="text-center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {data.map(({ id, image, origin, iban, status }) => (
              <TableRow key={id}>
                <TableCell>
                  <div className={styles.nameSection}>
                    <div className={styles.imageWrapper}>
                      <Image src={image} alt={origin} width={40} height={40} />
                    </div>
                    <Typography>{origin}</Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">
                    {splitString(iban, 4, " ")}
                  </Typography>
                </TableCell>
                <TableCell className="text-center">
                  <Typography
                    className={clsx("status-chip", ColorMap[status])}
                    component="span"
                  >
                    {StatusMap[status]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <div className={styles.actionSection}>
                    <Button
                      onClick={() => copyToClipboard(iban)}
                      variant="containedLight"
                      color="success"
                      startIcon={<CopyIcon />}
                    >
                      کپی
                    </Button>
                    <Button
                      onClick={() => deleteIban(id)}
                      variant="containedLight"
                      color="error"
                      startIcon={<TrashIcon />}
                    >
                      حذف
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && <LoadingComponent />}
      </div>
    );
  }
  return (
    <div className={styles.propertiesContainer}>
      {isEmpty ? (
        <Typography className={styles.description}>
          برای فروش ارز لازم است حداقل یک شبای بانکی به نام
          <Typography component="span" fontWeight="600">
            {` ${user.fullName} `}
          </Typography>
          ثبت نمایید.
        </Typography>
      ) : (
        <Typography className={styles.description}>
          شبا‌های بانکی ثبت شده باید به نام
          <Typography component="span" fontWeight="600">
            {` ${user.fullName} `}
          </Typography>
          باشد.
        </Typography>
      )}
      <Button
        onClick={openIbanModal}
        className={styles.addButton}
        variant="dashed"
        fullWidth
        startIcon={<AddIcon />}
      >
        ثبت شبای جدید
      </Button>
      {isEmpty ? (
        <EmptyContentComponent
          message="هنوز هیچ شبای بانکی ثبت نشده است."
          // buttonProps={{ onClick: openIbanModal, label: "ثبت شبای جدید" }}
          className={styles.emptyContainer}
        />
      ) : (
        <div className={styles.list}>
          {data.map(({ id, image, origin, iban, status }) => (
            <Paper key={id} className={styles.card}>
              <div className={styles.side}>
                <Image src={image} alt={origin} width={40} height={40} />
              </div>
              <div className={styles.content}>
                <Typography fontWeight={700}>{origin}</Typography>
                <div className={styles.dataRow}>
                  <Typography color="text.secondary">شماره شبا:</Typography>
                  <Typography component="span" className="inline-ltr">
                    {splitString(iban, 4, " ")}
                  </Typography>
                </div>
                <Typography color="text.secondary">
                  وضعیت:‌{" "}
                  <Typography
                    component="span"
                    className={clsx(styles.chip, styles[ColorMap[status]])}
                  >
                    {StatusMap[status]}
                  </Typography>
                </Typography>
                <div className={styles.foot}>
                  <div className={styles.action}>
                    <IconButton
                      onClick={() => copyToClipboard(iban)}
                      color="success"
                      size="small"
                    >
                      <CopyIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteIban(id)}
                      sx={{ ml: 0.5 }}
                      color="error"
                      size="small"
                    >
                      <TrashIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </Paper>
          ))}

          {loading && <LoadingComponent />}
        </div>
      )}
    </div>
  );
}
