import OrderCreationView from "./order-creation.view";
import { useErrorHandler, useRedirectNotUser } from "@/core/hooks";
import useOrderCreation from "@/modules/order/domain/usecases/useOrderCreation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

type PropTypes = {};
export default function OrderCreationPage(props: PropTypes) {
  const { data, error } = useOrderCreation();
  const router = useRouter();
  const errorHandler = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  useRedirectNotUser();

  useEffect(() => {
    if (error) return errorHandler(error);

    if (!data) return;

    if (data.status === 3) return;

    if (data.status === 1) {
      enqueueSnackbar(data.alert, { variant: "success" });
    } else {
      enqueueSnackbar(data.alert, { variant: "error" });
    }
    router.replace("/orders");
  }, [data?.status]);

  return <OrderCreationView />;
}
