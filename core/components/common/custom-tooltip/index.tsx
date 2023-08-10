import { useState } from "react";
import CustomTooltipView from "./custom-tooltip.view";

type PropTypes = { children: any; title: any };
export default function CustomTooltipComponent(props: PropTypes) {
  const [open, setOpen] = useState(false);
  return (
    <CustomTooltipView
      {...props}
      {...{
        open,
        handleClose: () => setOpen(false),
        handleOpen: () => setOpen(true),
      }}
    />
  );
}
