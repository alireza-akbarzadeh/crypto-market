import { SvgIcon, SvgIconProps } from "@mui/material";

export default function WalletLineIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M18 7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h15v4zM4 9v10h16V9H4zm0-4v2h12V5H4zm11 8h3v2h-3v-2z" />
      </g>
    </SvgIcon>
  );
}
