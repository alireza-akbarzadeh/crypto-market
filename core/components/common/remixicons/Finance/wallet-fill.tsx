import { SvgIcon, SvgIconProps } from "@mui/material";

export default function WalletFillIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M2 9h19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9zm1-6h15v4H2V4a1 1 0 0 1 1-1zm12 11v2h3v-2h-3z" />
      </g>
    </SvgIcon>
  );
}
