import { forwardRef } from "react";
import CustomSnackbarView from "./custom-snackbar.view";

type PropTypes = { id: string | number; message: string | React.ReactNode };

const CustomSnackbarComponent = forwardRef<HTMLDivElement, PropTypes>(
  (props, ref) => {
    return <CustomSnackbarView {...props} refObj={ref} />;
  }
);

export default CustomSnackbarComponent;
