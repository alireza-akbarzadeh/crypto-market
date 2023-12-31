import { SvgIcon, SvgIconProps } from "@mui/material";

export default function PercentLineIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M17.5 21a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-11-9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm12.571-4.485l1.414 1.414L4.93 20.485l-1.414-1.414L19.07 3.515z" />
      </g>
    </SvgIcon>
  );
}
