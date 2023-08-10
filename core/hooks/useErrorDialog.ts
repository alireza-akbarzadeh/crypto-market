import { useDispatch } from "@/core/hooks";
import { ResponseDialog } from "../http";
import { openAlert } from "@/modules/_app/presentation/redux";

type ActionMap = {
  [key: string]: (close: () => void) => void;
};
export default function useErrorDialog(actionMap?: ActionMap) {
  const dispatch = useDispatch();

  return (dialog: ResponseDialog) => {
    const { title, description, variant, actions } = dialog;
    dispatch(
      openAlert({
        title,
        message: description,
        variant,
        htmlMessage: true,
        "data-cy": "error-alert",
        actionButtons: actions.map(({ name, action, style }) => ({
          title: name,
          variant: style === "solid" ? "contained" : "outlined",
          handler: (close: any) => {
            if (!actionMap || !(action in actionMap)) {
              return close();
            }
            actionMap[action](close);
          },
        })),
      })
    );
  };
}
