import { createTheme } from "@mui/material/styles";
import { ThemeOptions, PaletteOptions } from "@mui/material";
import { alpha, CSSInterpolation } from "@mui/system";

const typography = {
  fontFamily: "IRANSans, Arial",
  fontSize: 12,
  h1: { fontSize: "1.714285714285714rem", fontWeight: 400 }, //24
  h2: { fontSize: "1.571428571428571rem", fontWeight: 400 }, //22
  h3: { fontSize: "1.428571428571429rem", fontWeight: 400 }, //20
  h4: { fontSize: "1.285714285714286rem", fontWeight: 400 }, //18
  h5: { fontSize: "1.142857142857143rem", fontWeight: 400 }, //16
  h6: { fontSize: "1rem", fontWeight: 400 }, //14
  body1: { fontSize: "0.857142857142857rem", fontWeight: 400 }, //12
  body2: { fontSize: "0.785714285714286rem", fontWeight: 400 }, //11
  caption: { fontSize: "0.714285714285714rem", fontWeight: 400 }, //10
  overline: { fontSize: "0.642857142857143rem", fontWeight: 400 }, //9
};
const lightPalette: PaletteOptions = {
  secondary: {
    // main: "#EBEDF1",30BE81
    main: "#8B9098",
    light: "#EBEDF1",
  },
  primary: { main: "#4285F2", light: "#4285f24d", lighter: "#4285F21A" },
  success: { main: "#30BE81", light: "#A0D6AEB2", lighter: "#A0D6AE1A" },
  // error: { main: "#E74560", light: "#F5A09B" },
  error: { main: "#EB4137", light: "#F5A09BB2", lighter: "#F5A09B1A" },
  warning: { main: "#FBBD06", light: "#FDDE82B2" },
  info: { main: "#4A7F9C", light: "#60abd547", lighter: "#4A7F9C1A" },
  background: {
    default: "#fff",
    secondary: "#fafafa",
    paper: "#fff",
  },
  // divider: "rgba(0, 0, 0, 0.12)",
  divider: "#e0e0e0",
  text: {
    primary: "#212121",
    secondary: "rgba(0, 0, 0, 0.6)",
  },
  action: {
    disabledBackground: "#6C759624",
    selected: "rgba(0, 0, 0, 0.08)",
  },
};
const darkPalette: PaletteOptions = {
  secondary: {
    main: "#646B7E",
    light: "#202A37",
  },
  primary: { main: "#3770CB", light: "#4285f24d", lighter: "#4285F21A" },
  success: { main: "#30BE81", light: "#34A8534D", lighter: "#34A8531A" },
  // error: { main: "#E74560", light: "#F5A09Bb3" },
  error: { main: "#EB4137", light: "#EB41374D", lighter: "#EB41371A" },
  warning: { main: "#FBBD06", light: "#FBBD064D" },
  info: { main: "#4A7F9C", light: "#60abd547" },
  mode: "dark",
  text: {
    primary: "rgba(255, 255, 255, 0.98)",
    secondary: "rgba(255, 255, 255, 0.7)",
  },
  grey: {
    [300]: "#202A37",
  },
  background: { default: "#111720", paper: "#202A37", secondary: "#111720" },
  divider: "#FFFFFF26",
  action: {
    disabledBackground: "#6C759624",
    selected: "rgba(255, 255, 255, 0.16)",
  },
};

function makeTheme(dark: boolean, palette: PaletteOptions): ThemeOptions {
  return {
    direction: "rtl",
    palette,
    typography,
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: palette.action?.selected,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 32,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 400,

            fontSize: "0.857142857142857rem",
            ...desktopDownMedia({
              fontSize: "0.785714285714286rem",
              fontWeight: 700,
            }),
          },
        },
        variants: [
          {
            props: { variant: "contained" },
            style: { boxShadow: "none" },
          },
          {
            props: { variant: "contained", color: "inherit" },
            style: {
              color: dark ? "#C4C4C4" : "#727272",
              backgroundColor: dark ? "#202A37" : "#f2f2f2",
              "&: hover": {
                backgroundColor: dark ? "#202A37" : "#f2f2f2",
              },
            },
          },
          {
            props: { size: "medium" },
            style: {
              padding: "7px 16px",
              ...desktopDownMedia({
                padding: "14px 16px",
              }),
            },
          },

          {
            props: { variant: "dashed", color: "primary" },
            style: {
              textTransform: "none",
              border: `1px dashed ${(palette.primary as any).main}`,
              color: (palette.primary as any).main,
              backgroundColor: palette.background?.default,
              fontWeight: 600,
            },
          },
          {
            props: { variant: "containedLight", color: "primary" },
            style: {
              color: (palette.primary as any).main,
              backgroundColor: (palette.primary as any).lighter,
              boxShadow: containedLightShadow(palette.primary),
              "&:hover": {
                backgroundColor: (palette.primary as any).light,
              },
            },
          },
          {
            props: { variant: "containedLight", color: "success" },
            style: {
              color: (palette.success as any).main,
              backgroundColor: (palette.success as any).lighter,
              "&:hover": {
                backgroundColor: (palette.success as any).light,
              },
            },
          },
          {
            props: { variant: "containedLight", color: "error" },
            style: {
              color: (palette.error as any).main,
              backgroundColor: (palette.error as any).lighter,
              "&:hover": {
                backgroundColor: (palette.error as any).light,
              },
            },
          },
        ],
      },
      MuiDivider: {
        variants: [
          {
            props: { light: true },
            style: {
              borderColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        ],
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 12,
            paddingRight: 12,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 8,
            minWidth: 0,
            color: (palette.secondary as any).main,
            borderColor: (palette.secondary as any).main,
            "&.Mui-selected": {
              paddingTop: 8,
              color: palette.text?.primary,
            },
          },
          label: {
            fontSize: "0.714285714285714rem",
            "&.Mui-selected": {
              fontSize: "0.714285714285714rem",
            },
            // "&.Mui-selected:not(:empty)": {
            //   marginTop: 4,
            //   marginBottom: 4,
            //   transitionProperty: "font-size, opacity margin",
            //   fontSize: "0.6rem",
            // },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            // fontSize: (0.857142857142857 * 4) / 3 + "rem",
            // fontSize: (12 * 4) / 3,
            transform: "translate(14px, 14px) scale(1)",
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -9px) scale(.9)",
            },
          },
          // focused: {
          //   ":root": {
          //     transform: "translate(-14px, 16px) scale(1)",
          //   },
          // },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& legend": {
              fontSize: 12,
            },
          },
        },
      },
      MuiTextField: {
        variants: [
          {
            props: { round: 1 },
            style: {
              "& .MuiOutlinedInput-root": {
                borderRadius: 24,
              },
            },
          },
          {
            props: { margin: "normal" },
            style: {
              marginBottom: 40,
              ...desktopDownMedia({
                marginBottom: 16,
              }),
            },
          },
        ],
      },
      MuiChip: {
        styleOverrides: {
          // root: { height: 20 },
          label: {
            display: "inline-flex",
            // paddingLeft: 10,
            // paddingRight: 10,
          },
          root: {
            "&.MuiChip-colorDefault": {
              backgroundColor: palette.action?.disabledBackground,
              // color: (palette.secondary as any).main,
            },
          },
        },
        variants: [
          {
            props: { color: "primary" },
            style: {
              "&:hover": {
                backgroundColor: (palette.primary as any).main,
              },
            },
          },
        ],
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: palette.divider,
          },
          indicator: {
            height: 1,
            ...mobileDownMedia({
              height: 4,
              transform: "scaleX(0.8)",
              borderRadius: "4px 4px 0 0",
            }),
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            ...typography.h6,
            fontSize: typography.h6.fontSize,
            fontWeight: typography.h6.fontWeight,
            borderRadius: "8px 8px 0px 0px",

            "&.Mui-selected": {
              background: `linear-gradient(180deg, ${alpha(
                (palette.primary as any).main,
                0.04
              )} 0%, ${alpha((palette.primary as any).main, 0.08)} 100%)`,
            },
            ...mobileDownMedia({
              "&.Mui-selected": {
                background: "none",
                // color: palette.text?.primary,
              },
            }),
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: 12,
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: (palette.secondary as any).main,
          },
          // positionStart: {
          // marginRight: -4,
          // },
          // positionEnd: {
          // marginLeft: -4,
          // },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "12px 16px",
            backgroundColor: (palette.secondary as any).light,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            // padding: "8.5px 12px !important",
            minHeight: 44,
            "&::placeholder": {
              color: (palette.secondary as any).main,
              opacity: 1,
            },
            ...desktopDownMedia({
              minHeight: 48,
            }),
          },
        },
        variants: [
          {
            props: { multiline: true },
            style: {
              "& textarea": {
                minHeight: "auto",
              },
            },
          },
        ],
      },
      // MuiIconButton: {
      //   variants: [
      //     {
      //       props: { color: "inherit" },
      //       style: { color: (palette.secondary as any).main },
      //     },
      //   ],
      // },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            // backdropFilter: "blur(3px)",
            // backgroundColor: dark ? "#00000099" : "#21212169",
            backgroundColor: dark ? "#00000099" : "rgba(32, 42, 55, 0.32)",
            "&.MuiBackdrop-invisible": {
              backdropFilter: "none",
              backgroundColor: "transparent",
            },
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          // root: {
          //   backdropFilter: "blur(3px)",
          //   backgroundColor: dark ? "#00000099" : "#21212169",
          // },
          paper: {
            backgroundColor: palette.background?.secondary,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: dark ? "#FFFFFF26" : "#00000026",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: dark
              ? "linear-gradient(0deg, rgba(17, 23, 32, 0.5), rgba(17, 23, 32, 0.5))"
              : "none",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.background?.paper,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // backgroundColor: palette.background?.default,
          },
          input: {
            boxSizing: "border-box",
            // height: 48,
          },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            borderRadius: 8,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: palette.divider,
            ...desktopDownMedia({
              backgroundColor: palette.background?.paper,
              borderRadius: 40,
            }),
          },
          grouped: {
            margin: 4,
            color: palette.text?.primary,
            border: 0,
            borderRadius: "8px !important",
            boxShadow: `0px 40px 72px rgba(${
              (palette.primary as any).main
            }, 0.08)`,
            minHeight: 35,
            fontSize: typography.body1.fontSize,
            fontWeight: 400,
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: (palette.primary as any).lighter,
              color: (palette.primary as any).main,
            },
            "&.Mui-disabled": {
              border: 0,
            },

            ...desktopDownMedia({
              borderRadius: "40px !important",
              fontWeight: 500,

              "&.Mui-selected, &.Mui-selected:hover": {
                fontWeight: 600,
              },
            }),
          },
        },
      },
      MuiAlert: {
        variants: [
          {
            props: { severity: "warning" },
            style: {
              background: (palette.warning as any).light,
              color: palette.text?.secondary,
            },
          },
          {
            props: { severity: "info" },
            style: {
              backgroundColor: (palette.info as any).lighter,
              color: (palette.info as any).main,
              "& .MuiAlert-icon": {
                color: (palette.info as any).main,
                fontSize: "1.85em",
              },
            },
          },
        ],
        styleOverrides: {
          root: {
            padding: 8,
          },
          icon: {
            fontSize: 18,
            marginRight: 5,
          },
        },
      },
    },
    shadows: [
      "none",
      // "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      "0px 0px 4px rgba(0, 0, 0, 0.14)",
      "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
      "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
      "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
      "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
      "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
      "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px…gba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
      "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px…gba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
      "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px…gba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
      "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px…gba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
      "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px…gba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
      "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px…gba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
      "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2p…gba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
      "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2p…gba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
      "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2p…gba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
      "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2p…gba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
      "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3…gba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
      "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3…gba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
      "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3…gba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
      "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3…gba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
      "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3…gba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    ],
  };
}
function desktopDownMedia(styles: CSSInterpolation) {
  return { "@media (max-width: 899px)": styles };
}
function mobileDownMedia(styles: CSSInterpolation) {
  return { "@media (max-width: 599px)": styles };
}
function containedLightShadow(color: any) {
  return `0px 12px 24px ${alpha(
    color.main,
    0.08
  )}, inset 0px -10px 20px ${alpha(color.main, 0.12)}`;
}
export const themeLight = createTheme(makeTheme(false, lightPalette));
export const themeDark = createTheme(makeTheme(true, darkPalette));
export { default as RTL } from "./rtl";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    default: string;
    secondary: string;
    paper: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
  }
}
declare module "@mui/material/TextField" {
  interface OutlinedTextFieldProps {
    round?: number;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
    containedLight: true;
  }
}
