import { SvgIcon, SvgIconProps } from "@mui/material";

export default function ServiceAcademyIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect width="24" height="24" rx="12" fill="#07C5AE" />
      <g filter="url(#filter0_i_431_421)">
        <path
          d="M14.8175 14.1233C15.2083 13.8667 15.7217 14.1467 15.7217 14.6133V15.3658C15.7217 16.1067 15.1442 16.9 14.45 17.1333L12.5892 17.7517C12.2625 17.8625 11.7317 17.8625 11.4108 17.7517L9.54999 17.1333C8.84999 16.9 8.27832 16.1067 8.27832 15.3658V14.6075C8.27832 14.1467 8.79165 13.8667 9.17665 14.1175L10.3783 14.8992C10.8392 15.2083 11.4225 15.36 12.0058 15.36C12.5892 15.36 13.1725 15.2083 13.6333 14.8992L14.8175 14.1233Z"
          fill="white"
        />
        <path
          d="M16.655 8.76833L13.1608 6.47583C12.5308 6.06167 11.4925 6.06167 10.8625 6.47583L7.35084 8.76833C6.22501 9.4975 6.22501 11.1483 7.35084 11.8833L8.28418 12.49L10.8625 14.17C11.4925 14.5842 12.5308 14.5842 13.1608 14.17L15.7217 12.49L16.5208 11.965V13.75C16.5208 13.9892 16.7192 14.1875 16.9583 14.1875C17.1975 14.1875 17.3958 13.9892 17.3958 13.75V10.88C17.6292 10.1275 17.39 9.2525 16.655 8.76833Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_431_421"
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
            values="0 0 0 0 0.027451 0 0 0 0 0.772549 0 0 0 0 0.682353 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_431_421"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}
