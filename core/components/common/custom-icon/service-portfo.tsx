import { SvgIcon, SvgIconProps } from "@mui/material";

export default function ServicePortfoIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="24" height="24" rx="12" fill="#FBBD06" />
      <g filter="url(#filter0_i_431_435)">
        <path
          d="M11.416 6.19549V12.583H17.8035C17.5113 15.5306 15.0239 17.833 11.9993 17.833C8.7776 17.833 6.16602 15.2214 6.16602 11.9997C6.16602 8.97507 8.46843 6.48774 11.416 6.19549V6.19549ZM12.5827 5.31641C15.8219 5.59466 18.4038 8.17707 18.6826 11.4163H12.5827V5.31641V5.31641Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_431_435"
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
            values="0 0 0 0 0.984314 0 0 0 0 0.741176 0 0 0 0 0.0235294 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_431_435"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}
