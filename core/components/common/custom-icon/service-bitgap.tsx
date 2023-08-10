import { SvgIcon, SvgIconProps } from "@mui/material";

export default function ServiceBitgapIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="24" height="24" rx="12" fill="#12CFED" />
      <g filter="url(#filter0_i_431_431)">
        <path
          d="M6.16699 10.2465C6.16669 9.78696 6.25703 9.33186 6.43286 8.90728C6.60868 8.4827 6.86653 8.09697 7.19165 7.77218C7.51676 7.4474 7.90274 7.18993 8.3275 7.01453C8.75226 6.83913 9.20745 6.74924 9.66699 6.75H14.3337C16.2662 6.75 17.8337 8.32209 17.8337 10.2465V17.25H9.66699C7.73441 17.25 6.16699 15.6779 6.16699 13.7535V10.2465ZM13.167 11.4167V12.5833H14.3337V11.4167H13.167ZM9.66699 11.4167V12.5833H10.8337V11.4167H9.66699Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_431_431"
          x="3"
          y="3"
          width="16"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0705882 0 0 0 0 0.811765 0 0 0 0 0.929412 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_431_431"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}
