import { useDispatch, useSelector, useUpdateEffect } from "@/core/hooks";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import useUserIbanList from "@/modules/profile/domain/usecases/useUserIbanList";
import { openIbanModal } from "@/modules/profile/presentation/redux";
import useWallet from "@/modules/wallet/domain/usecases/useWallet";
import { useEffect } from "react";
import SelectIbanModalView from "./select-iban-modal.view";

type PropTypes = {
  open: boolean;
  onClose: () => void;
  onSelect: (iban: IbanInterface) => void;
  selected?: IbanInterface;
};
export default function SelectIbanModalComponent(props: PropTypes) {
  const { onSelect, selected, onClose, open } = props;
  const { isIbanModalOpen } = useSelector((s) => s.profile);
  const dispatch = useDispatch();
  const { data: ibans, loading, mutate } = useUserIbanList(true);

  useUpdateEffect(() => {
    if (isIbanModalOpen) return;
    mutate();
  }, [isIbanModalOpen]);

  return (
    <SelectIbanModalView
      {...{
        openIbanModal: () => dispatch(openIbanModal()),
        onSelect,
        ibans,
        loading,
        selected,
        onClose,
        open,
      }}
    />
  );
}
