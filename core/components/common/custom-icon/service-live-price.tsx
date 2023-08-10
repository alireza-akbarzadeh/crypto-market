import { SvgIcon, SvgIconProps } from "@mui/material";

export default function ServiceLivePriceIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="24" height="24" rx="12" fill="#34A853" />
      <g filter="url(#filter0_i_431_439)">
        <path
          d="M11.6816 18.0454C12.4253 18.0454 13.0338 17.401 13.0338 16.6135V8.02264C13.0338 7.23514 12.4253 6.59082 11.6816 6.59082C10.9378 6.59082 10.3293 7.23514 10.3293 8.02264V16.6135C10.3293 17.401 10.9378 18.0454 11.6816 18.0454ZM7.62473 18.0454C8.36848 18.0454 8.97701 17.401 8.97701 16.6135V13.7499C8.97701 12.9624 8.36848 12.3181 7.62473 12.3181C6.88098 12.3181 6.27246 12.9624 6.27246 13.7499V16.6135C6.27246 17.401 6.88098 18.0454 7.62473 18.0454ZM14.3861 11.6022V16.6135C14.3861 17.401 14.9946 18.0454 15.7384 18.0454C16.4821 18.0454 17.0906 17.401 17.0906 16.6135V11.6022C17.0906 10.8147 16.4821 10.1704 15.7384 10.1704C14.9946 10.1704 14.3861 10.8147 14.3861 11.6022Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_431_439"
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
            values="0 0 0 0 0.203922 0 0 0 0 0.658824 0 0 0 0 0.32549 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_431_439"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}
