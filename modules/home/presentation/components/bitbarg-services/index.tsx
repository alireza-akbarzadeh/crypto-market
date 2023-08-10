// import { useDispatch } from "@/core/hooks";
import { HomeDataInterface } from "@/modules/home/domain/entities/home";
// import { openAlert } from "@/modules/_app/presentation/redux";
import { useSnackbar } from "notistack";
import CryptoServicesView from "./crypto-services.view";

type PropTypes = { data: HomeDataInterface["services"] };
export default function CryptoServicesComponent(props: PropTypes) {
  const { enqueueSnackbar } = useSnackbar();
  // const dispatch = useDispatch();
  const handleStatus =
    (status: { active: boolean; description?: string }) => (e: any) => {
      if (status.active) return;
      e.preventDefault();
      if (!status.description) return;
      enqueueSnackbar(status.description, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      // dispatch(
      //   openAlert({
      //     title: status.description,
      //     actionButtons: [{}],
      //   })
      // );
    };

  return <CryptoServicesView {...props} handleStatus={handleStatus} />;
}
