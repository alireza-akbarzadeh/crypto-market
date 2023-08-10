import { SvgIcon, SvgIconProps } from "@mui/material";

export default function SupportIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2ZM5.17 16H20V4H4V17.17L5.17 16Z" />
    </SvgIcon>
  );
}
