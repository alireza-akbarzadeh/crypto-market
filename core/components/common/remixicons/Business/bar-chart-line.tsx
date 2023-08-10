import { SvgIcon, SvgIconProps } from "@mui/material";

export default function BarChartLineIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M3 12h2v9H3v-9zm16-4h2v13h-2V8zm-8-6h2v19h-2V2z" />
      </g>
    </SvgIcon>
  );
}
