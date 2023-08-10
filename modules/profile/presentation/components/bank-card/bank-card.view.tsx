import styles from "../../utils/profile-sections.module.scss";
import {
  Button,
  IconButton,
  Paper,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import Image from "next/image";
import { CopyIcon, TrashIcon } from "@/core/components/common/custom-icon";
import { splitString } from "@/core/helpers";
import { UserInterface } from "@/modules/auth/domain/entities/user";
import { BankCardStatus } from "@/core/enums/profile.enums";
import { BankCardInterface } from "@/modules/profile/domain/entities/bank-card";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import clsx from "clsx";
import LoadingComponent from "@/core/components/common/loading";
import EmptyContentComponent from "@/core/components/common/empty-content";

const ColorMap = {
  [BankCardStatus.Accepted]: "success",
  [BankCardStatus.NotAccepted]: "error",
  [BankCardStatus.Pending]: "primary",
};
const StatusMap = {
  [BankCardStatus.Accepted]: "تایید شده",
  [BankCardStatus.NotAccepted]: "تایید نشده",
  [BankCardStatus.Pending]: "در حال بررسی",
};

type PropTypes = {
  user: UserInterface;
  isDesktopSize: boolean;
  data: BankCardInterface[];
  openBankCardModal: () => void;
  copyToClipboard: (value: string) => void;
  deleteCard: (id: string) => void;
  loading: boolean;
};
export default function BankCardView(props: PropTypes) {
  const {
    user,
    isDesktopSize,
    data,
    openBankCardModal,
    copyToClipboard,
    deleteCard,
    loading,
  } = props;

  const isEmpty = !data.length && !loading;
  if (isDesktopSize) {
    if (isEmpty) {
      return (
        <EmptyContentComponent
          message="هنوز هیچ کارت بانکی ثبت نشده است."
          buttonProps={{ onClick: openBankCardModal, label: "ثبت کارت جدید" }}
          className={styles.emptyContainer}
        />
      );
    }
    return (
      <div className={styles.propertiesDesktop}>
        <Button
          onClick={openBankCardModal}
          className={styles.addButton}
          variant="dashed"
        >
          ثبت کارت جدید
        </Button>
        <Table className={styles.table}>
          <TableHead>
            <TableRow className={styles.headRow}>
              <TableCell>نام بانک</TableCell>
              <TableCell>شماره کارت بانکی</TableCell>
              <TableCell className="text-center">وضعیت</TableCell>
              <TableCell className="text-center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {data.map(({ id, image, origin, cardNumber, status }) => (
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
                    {splitString(cardNumber, 4, "-")}
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
                      variant="containedLight"
                      color="success"
                      startIcon={<CopyIcon />}
                      onClick={() => copyToClipboard(cardNumber)}
                    >
                      کپی
                    </Button>
                    <Button
                      onClick={() => deleteCard(id)}
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
          برای خرید ارز لازم است حداقل یک کارت بانکی به نام
          <Typography component="span" fontWeight="600">
            {` ${user.fullName} `}
          </Typography>
          ثبت نمایید.
        </Typography>
      ) : (
        <Typography className={styles.description}>
          کارت‌های بانکی ثبت شده باید به نام
          <Typography component="span" fontWeight="600">
            {` ${user.fullName} `}
          </Typography>
          باشد.
        </Typography>
      )}

      <Button
        onClick={openBankCardModal}
        className={styles.addButton}
        variant="dashed"
        fullWidth
        startIcon={<AddIcon />}
      >
        ثبت کارت جدید
      </Button>
      {isEmpty ? (
        <EmptyContentComponent
          message="هنوز هیچ کارت بانکی ثبت نشده است."
          // buttonProps={{ onClick: openBankCardModal, label: "ثبت کارت جدید" }}
          className={styles.emptyContainer}
        />
      ) : (
        <div className={styles.list}>
          {data.map(({ id, image, origin, cardNumber, status }) => (
            <Paper key={id} className={styles.card}>
              <div className={styles.side}>
                <Image src={image} alt={origin} width={40} height={40} />
              </div>
              <div className={styles.content}>
                <Typography fontWeight={700}>{origin}</Typography>
                <div className={styles.dataRow}>
                  <Typography color="text.secondary">شماره کارت:</Typography>
                  <Typography component="span" className="inline-ltr">
                    {splitString(cardNumber, 4, " ")}
                  </Typography>
                </div>
                {/* <Typography>صادر کننده:‌ {origin}</Typography> */}
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
                      onClick={() => copyToClipboard(cardNumber)}
                      color="success"
                      size="small"
                    >
                      <CopyIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteCard(id)}
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
