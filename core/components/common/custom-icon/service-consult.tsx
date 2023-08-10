import { SvgIcon, SvgIconProps } from "@mui/material";

export default function ServiceConsultIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="24" height="24" rx="12" fill="#1065EF" />
      <g filter="url(#filter0_i_431_423)">
        <path
          d="M9.25244 17.1477L6.16602 17.8337L6.85202 14.7472C6.40025 13.9022 6.16458 12.9585 6.16602 12.0003C6.16602 8.77858 8.77761 6.16699 11.9994 6.16699C15.2211 6.16699 17.8327 8.77858 17.8327 12.0003C17.8327 15.2221 15.2211 17.8337 11.9994 17.8337C11.0411 17.8351 10.0975 17.5994 9.25244 17.1477V17.1477ZM9.08269 12.0003C9.08269 12.7739 9.38998 13.5157 9.93696 14.0627C10.4839 14.6097 11.2258 14.917 11.9994 14.917C12.7729 14.917 13.5148 14.6097 14.0618 14.0627C14.6087 13.5157 14.916 12.7739 14.916 12.0003H13.7494C13.7494 12.4645 13.565 12.9096 13.2368 13.2378C12.9086 13.566 12.4635 13.7503 11.9994 13.7503C11.5352 13.7503 11.0901 13.566 10.7619 13.2378C10.4337 12.9096 10.2494 12.4645 10.2494 12.0003H9.08269Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_431_423"
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
            values="0 0 0 0 0.0627451 0 0 0 0 0.396078 0 0 0 0 0.937255 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_431_423"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}
