// @note - https://mui.com/joy-ui/customization/approaches/

import { extendTheme } from "@mui/joy/styles";

export const githubTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        success: {
          solidBg: "#2DA44E",
          solidHoverBg: "#2C974B",
          solidActiveBg: "#298E46",
        },
        neutral: {
          outlinedBg: "#F6F8FA",
          outlinedHoverBg: "#F3F4F6",
          outlinedActiveBg: "rgba(238, 239, 242, 1)",
          outlinedBorder: "rgba(27, 31, 36, 0.15)",
        },
        focusVisible: "rgba(3, 102, 214, 0.3)",
      },
    },
  },
  focus: {
    default: {
      outlineWidth: "3px",
    },
  },
  fontFamily: {
    body: "SF Pro Text, var(--gh-fontFamily-fallback)",
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "6px",
          boxShadow: "0 1px 0 0 rgba(27, 31, 35, 0.04)",
          transition: "80ms cubic-bezier(0.33, 1, 0.68, 1)",
          transitionProperty: "color,background-color,box-shadow,border-color",
          ...(ownerState.size === "md" && {
            fontWeight: 600,
            minHeight: "32px",
            fontSize: "14px",
            "--Button-paddingInline": "1rem",
          }),
          ...(ownerState.color === "success" &&
            ownerState.variant === "solid" && {
              "--gh-palette-focusVisible": "rgba(46, 164, 79, 0.4)",
              border: "1px solid rgba(27, 31, 36, 0.15)",
              "&:active": {
                boxShadow: "inset 0px 1px 0px rgba(20, 70, 32, 0.2)",
              },
            }),
          ...(ownerState.color === "neutral" &&
            ownerState.variant === "outlined" && {
              "&:active": {
                boxShadow: "none",
              },
            }),
        }),
      },
    },
  },
});

export const fluentTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#0078D4",
          solidHoverBg: "#106EBE",
          solidActiveBg: "#005A9E",
          solidDisabledBg: "#F3F2F1",
          solidDisabledColor: "#A19F9D",
        },
        neutral: {
          outlinedBg: "#fff",
          outlinedColor: "#201F1E",
          outlinedDisabledBg: "#F3F2F1",
          outlinedDisabledColor: "#A19F9D",
          outlinedDisabledBorder: "#C8C6C4",
          outlinedBorder: "#8A8886",
          outlinedHoverBg: "#F3F2F1",
          outlinedHoverBorder: undefined,
          outlinedActiveBg: "#EDEBE9",
        },
        focusVisible: "#323130",
      },
    },
  },
  focus: {
    default: {
      outlineOffset: -1,
      outlineWidth: "1px",
    },
  },
  fontFamily: {
    body: '"Segoe UI Variable", var(--fluent-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "--Button-iconOffsetStep": 0,
          ...(ownerState.variant === "solid" && {
            "&.Mui-focusVisible, &:focus-visible": {
              outlineOffset: "-3px",
              outlineColor: "#fff",
            },
          }),
          ...(ownerState.variant === "outlined" && {
            "&.Mui-focusVisible, &:focus-visible": {
              outlineOffset: "-3px",
            },
          }),
          ...(ownerState.size === "md" && {
            "--Icon-fontSize": "20px",
            fontSize: "14px",
            fontWeight: 600,
            minHeight: "32px",
            borderRadius: "2px",
            paddingLeft: 20,
            paddingRight: 20,
          }),
        }),
      },
    },
  },
});
