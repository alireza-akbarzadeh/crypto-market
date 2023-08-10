import AppDialogComponent from "@/core/components/common/app-dialog";
import LoadingComponent from "@/core/components/common/loading";
import LoadingButton from "@/core/components/common/loading-button";
import { WalletAddressInterface } from "@/modules/profile/domain/entities/wallet-address";
import WalletAddressCardSelectableComponent from "@/modules/profile/presentation/components/wallet-address-card-selectable";
import { Button, List } from "@mui/material";
import styles from "./change-wallet-modal.module.scss";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  openAddressModal: () => void;
  data: WalletAddressInterface[];
  loading: boolean;
  selectAddress: (address: WalletAddressInterface) => void;
  selected?: WalletAddressInterface;
  submit: () => void;
};
export default function ChangeWalletModalView(props: PropTypes) {
  const {
    open,
    onClose,
    data,
    loading,
    openAddressModal,
    selectAddress,
    selected,
    submit,
  } = props;
  return (
    <AppDialogComponent
      classes={{ paper: styles.paper }}
      contentClassName={styles.content}
      closeOnOutside={false}
      className={styles.root}
      open={open}
      onClose={onClose}
      title="تغییر کیف پول"
      mobileStyle={4}
      headerClassName={styles.header}
    >
      {" "}
      <Button
        onClick={openAddressModal}
        variant="dashed"
        // startIcon={<AddIcon />}
        className={styles.addButton}
      >
        افزودن آدرس ارزی جدید
      </Button>
      <List className={styles.list}>
        {data.map((data) => (
          <WalletAddressCardSelectableComponent
            key={data.id}
            data={data}
            onSelect={() => selectAddress(data)}
            selected={selected?.id === data.id}
          />
        ))}
        {loading && <LoadingComponent />}
        <LoadingButton
          className={styles.submit}
          onClick={submit}
          fullWidth
          variant="contained"
          disabled={!selected}
        >
          تایید
        </LoadingButton>
      </List>
    </AppDialogComponent>
  );
}
