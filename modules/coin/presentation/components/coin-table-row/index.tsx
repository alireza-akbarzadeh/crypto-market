import { CoinDataInterface } from "@/modules/coin/domain/entities/coin";
import { useRouter } from "next/router";
import { useState } from "react";
import CoinTableRowView from "./coin-table-row.view";
import { useDeepCompareEffect, useDispatch } from "@/core/hooks";
import useUser from "@/modules/auth/domain/usecases/useUser";
import { openLoginModal } from "@/modules/auth/presentation/redux";

type PropTypes = {
  index: number;
  style: any;
  data?: CoinDataInterface;
  mode: string;
  isDesktopSize?: boolean;
  // mutate: () => void;
  toggleStar: () => void;
};
export default function CoinTableRowComponent(props: PropTypes) {
  const {
    data,
    index,
    style,
    mode,
    isDesktopSize,
    //  mutate,
    toggleStar,
  } = props;
  const [oldPrice, setOldPrice] = useState(data?.changes);
  const [changeClass, setChangeClass] = useState("");
  const { user } = useUser();
  const dispatch = useDispatch();

  useDeepCompareEffect(() => {
    const old = oldPrice;
    setOldPrice(data?.changes);
    if (!data?.changes || !old || data.changes === old) return;
    const updateDelay = Math.round(Math.random() * 10) * 200;
    const inTimeout = setTimeout(() => {
      // setChangeClass(data.changes > old ? "pump" : "dump");
      setChangeClass(data.changes > 0 ? "pump" : "dump");
    }, updateDelay);

    const timeout = setTimeout(() => {
      setChangeClass("");
    }, updateDelay + 500);

    return () => {
      clearTimeout(inTimeout);
      clearTimeout(timeout);
    };
  }, [data?.changes]);

  const router = useRouter();
  const handleToggleStar = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (!data) return;
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    toggleStar();
  };
  return (
    <CoinTableRowView
      {...{
        index,
        style,
        mode,
        isDesktopSize,
        data,
        changeClass,
      }}
      toggleStar={handleToggleStar}
    />
  );
}
