import { Button, ButtonBase, DialogContent, Typography } from "@mui/material";
import styles from "./select-iban-modal.module.scss";
import AddIcon from "@mui/icons-material/ControlPointRounded";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import AppDialogComponent from "@/core/components/common/app-dialog";
import clsx from "clsx";
import LoadingComponent from "@/core/components/common/loading";
import { splitString } from "@/core/helpers";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowBack";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  openIbanModal: () => void;
  onSelect: (iban: IbanInterface) => void;
  ibans?: IbanInterface[];
  loading: boolean;
  selected?: IbanInterface;
};
export default function SelectIbanModalView(props: PropTypes) {
  const { open, onClose, openIbanModal, onSelect, ibans, loading, selected } =
    props;
  return (
    <AppDialogComponent
      className={styles.root}
      // contentClassName={styles.content}
      open={open}
      onClose={onClose}
      closeOnOutside={false}
      title="انتخاب شبا"
      mobileStyle={2}
    >
      <DialogContent className={styles.content}>
        <Typography className={styles.title}>
          لطفا شبای بانکی خود را انتخاب کنید.
        </Typography>
        <Button
          onClick={openIbanModal}
          variant="dashed"
          fullWidth
          startIcon={<AddIcon />}
        >
          ثبت شبای بانکی جدید
        </Button>
        {ibans?.map((iban) => (
          <ButtonBase
            component="div"
            key={iban.id}
            onClick={() => onSelect(iban)}
            className={clsx({
              [styles.card]: true,
              [styles.selected]: selected?.id === iban.id,
              [styles.disabled]: iban.alert,
            })}
          >
            <div className={styles.header}>
              <div className={styles.imageWrapper}>
                <Image src={iban.image} width={32} height={32} />
              </div>
              <Typography className={styles.name}>{iban.origin}</Typography>
              <ArrowForwardIcon />
            </div>
            <Typography className={styles.iban}>
              {splitString(iban.iban, 4, " ")}
            </Typography>
          </ButtonBase>
        ))}
        {loading && <LoadingComponent />}
      </DialogContent>
    </AppDialogComponent>
  );
}
