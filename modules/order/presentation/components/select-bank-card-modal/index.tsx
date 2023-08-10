import SelectBankCardModalView from "./select-bank-card-modal.view";
import { useDispatch } from "@/core/hooks";
import { openBankCardModal } from "@/modules/profile/presentation/redux";
import useWallet from "@/modules/wallet/domain/usecases/useWallet";
import { BankCardInterface } from "@/modules/profile/domain/entities/bank-card";
import useUserBankCards from "@/modules/profile/domain/usecases/useUserBankCards";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSelect: (card: BankCardInterface) => void;
  selected?: BankCardInterface;
};
export default function SelectBankCardModalComponent(props: PropTypes) {
  const { onSelect, selected, onClose, open } = props;
  const dispatch = useDispatch();
  const { data, loading } = useUserBankCards(true);
  return (
    <SelectBankCardModalView
      {...{
        openBankCardModal: () => dispatch(openBankCardModal()),
        onSelect,
        cards: data,
        loading,
        selected,
        onClose,
        open,
      }}
    />
  );
}
