import styles from "./select-bank-card-modal.module.scss";
import { Button, ButtonBase, DialogContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import AppDialogComponent from "@/core/components/common/app-dialog";
import clsx from "clsx";
import LoadingComponent from "@/core/components/common/loading";
import { splitString } from "@/core/helpers";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowBack";
import { BankCardInterface } from "@/modules/profile/domain/entities/bank-card";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  openBankCardModal: () => void;
  onSelect: (card: BankCardInterface) => void;
  cards?: BankCardInterface[];
  loading: boolean;
  selected?: BankCardInterface;
};
export default function SelectBankCardModalView(props: PropTypes) {
  const {
    open,
    onClose,
    openBankCardModal,
    onSelect,
    cards,
    loading,
    selected,
  } = props;
  return (
    <AppDialogComponent
      className={styles.root}
      // contentClassName={styles.content}
      open={open}
      onClose={onClose}
      closeOnOutside={false}
      title="انتخاب کارت بانکی"
      mobileStyle={2}
    >
      <DialogContent className={styles.content}>
        <Typography className={styles.title}>
          لطفا کارت بانکی خود را انتخاب کنید.
        </Typography>
        <Button
          onClick={openBankCardModal}
          variant="dashed"
          fullWidth
          startIcon={<AddIcon />}
        >
          ثبت کارت بانکی جدید
        </Button>
        {cards?.map((card) => (
          <ButtonBase
            component="div"
            key={card.id}
            onClick={() => onSelect(card)}
            className={clsx({
              [styles.card]: true,
              [styles.selected]: selected?.id === card.id,
            })}
          >
            <div className={styles.header}>
              <div className={styles.imageWrapper}>
                <Image src={card.image} width={32} height={32} />
              </div>
              <Typography className={styles.name}>{card.origin}</Typography>
              <ArrowForwardIcon />
            </div>
            <Typography className={styles.text}>
              {splitString(card.cardNumber, 4, " ")}
            </Typography>
          </ButtonBase>
        ))}
        {loading && <LoadingComponent />}
      </DialogContent>
    </AppDialogComponent>
  );
}
