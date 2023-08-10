import { SvgIcon, SvgIconProps } from "@mui/material";

export default function ServiceNewsIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="24" height="24" rx="12" fill="#F76E11" />
      <g filter="url(#filter0_i_431_427)">
        <path
          d="M16.0827 17.8337H7.91602C7.45189 17.8337 7.00677 17.6493 6.67858 17.3211C6.35039 16.9929 6.16602 16.5478 6.16602 16.0837V6.75033C6.16602 6.59562 6.22747 6.44724 6.33687 6.33785C6.44627 6.22845 6.59464 6.16699 6.74935 6.16699H14.916C15.0707 6.16699 15.2191 6.22845 15.3285 6.33785C15.4379 6.44724 15.4993 6.59562 15.4993 6.75033V10.8337H17.8327V16.0837C17.8327 16.5478 17.6483 16.9929 17.3201 17.3211C16.9919 17.6493 16.5468 17.8337 16.0827 17.8337ZM15.4993 12.0003V16.0837C15.4993 16.2384 15.5608 16.3867 15.6702 16.4961C15.7796 16.6055 15.928 16.667 16.0827 16.667C16.2374 16.667 16.3858 16.6055 16.4952 16.4961C16.6046 16.3867 16.666 16.2384 16.666 16.0837V12.0003H15.4993ZM7.91602 8.50033V12.0003H11.416V8.50033H7.91602ZM7.91602 12.5837V13.7503H13.7493V12.5837H7.91602ZM7.91602 14.3337V15.5003H13.7493V14.3337H7.91602ZM9.08268 9.66699H10.2493V10.8337H9.08268V9.66699Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_431_427"
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
            values="0 0 0 0 0.968627 0 0 0 0 0.431373 0 0 0 0 0.0666667 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_431_427"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}
