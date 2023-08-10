import SellingTypeView from "./selling-type.view";
import { SellType } from "@/core/enums/order.enums";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { useState } from "react";
import useSellSteps from "@/modules/order/domain/usecases/useSellSteps";
import { IbanInterface } from "@/modules/profile/domain/entities/iban";
import sellCheckoutType from "@/modules/order/domain/usecases/sellCheckoutType";
import { useDispatch } from "@/core/hooks";
import { openAlert } from "@/modules/_app/presentation/redux";
// import { useErrorHandler } from "@/core/hooks";

type PropTypes = {
  onNext: (ibanId?: string) => void;
  onPrev: () => void;
};
export default function SellingTypeComponent(props: PropTypes) {
  const { onNext, onPrev } = props;
  const { user } = useUser();
  const [selected, setSelected] = useState<SellType>(1);
  const [selectedIban, setSelectedIban] = useState<IbanInterface>();
  const [dirty, setDirty] = useState<boolean>(false);
  const [selectIbanOpen, setSelectIbanOpen] = useState<boolean>(false);
  const { data } = useSellSteps();
  const dispatch = useDispatch();
  // const errorHandler = useErrorHandler();

  const handleNext = () => {
    setDirty(true);
    if (!selected) return;
    // const { error } = await
    sellCheckoutType(selected, selectedIban?.id);
    // if (error) {
    //   errorHandler(error);
    //   return;
    // }
    onNext(selectedIban?.id);
  };
  const handlePrev = () => onPrev();
  const handleSelect = (v: SellType) => {
    if (v === SellType.Iban) {
      setSelectIbanOpen(true);
      return;
    }
    setSelectedIban(undefined);
    setSelected(v);
  };
  const onIbanSelect = (iban: IbanInterface) => {
    if (iban.alert) {
      dispatch(
        openAlert({
          message: iban.alert,
          skipCloseIcon: true,
          actionButtons: [
            {
              title: "متوجه شدم",
              handler: (close: any) => {
                close();
              },
            },
          ],
        })
      );
      return;
    }
    setSelectedIban(iban);
    setSelectIbanOpen(false);
    setSelected(SellType.Iban);
  };
  return (
    <SellingTypeView
      {...{
        handlePrev,
        handleNext,
        user,
        selected,
        handleSelect,
        dirty,
        selectIbanOpen,
        closeSelectIban: () => setSelectIbanOpen(false),
        data,
        onIbanSelect,
        selectedIban,
      }}
    />
  );
}
