import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  fonts: {
    body: "PloniRegular",
    heading: "PloniBold",
  },
  colors: {
    primary: "#0A151F",
    primaryLight: "#0A151F90",
    secondary: "#092030",
    "secondary.800": "#09203080",
    accent: {
      50: "#3A99FF",
      100: "#3A99FF",
      200: "#3A99FF",
      300: "#3A99FF",
      400: "#3A99FF",
      500: "#3A99FF", // real accent
      600: "#039BE5",
      700: "#0288D1",
      800: "#0277BD",
      900: "#3A99FF",
    },
    accentHover: "#004B9B",
    "accentAlpha.900": "#3A99FF90",
    "accentAlpha.400": "#3A99FF40",
    "accentAlpha.100": "#3A99FF10",
  },
  components: {
    Divider: {
      baseStyle: {
        color: "whiteAlpha.400",
        opacity: 0.1,
      },
    },
    Button: {
      defaultProps: {
        colorScheme: "accent",
        color: "white",
      },
      baseStyle: {
        color: "white",
        bg: "accent.500",
      },
    },
    Heading: {
      baseStyle: {
        color: "white",
      },
    },
    Text: {
      baseStyle: {
        color: "white",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "white",
      },
    },
    Select: {
      baseStyle: {
        field: {
          color: "white",
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          color: "white",
          borderColor: "white",
          "::placeholder": {
            color: "whiteAlpha.800",
          },
          ":-ms-input-placeholder": {
            color: "whiteAlpha.800",
          },
          "::-ms-input-placeholder": {
            color: "whiteAlpha.400",
          },
        },
      },
    },
    Spinner: {
      baseStyle: {
        color: "white",
      },
    },
    Checkbox: {
      defaultProps: {
        size: "lg",
      },
      baseStyle: {
        label: {
          marginStart: "12px",
          color: "white",
        },
        container: {
          borderColor: "whiteAlpha.600",
        },
        icon: {
          color: "white",
        },
        control: {
          bg: "secondary",
          _checked: {
            bg: "accent.500",
            borderColor: "accent.500",
            _hover: {
              bg: "accent.500",
              borderColor: "accent.500",
            },
          },
        },
      },
    },
    Radio: {
      baseStyle: {
        control: {
          _checked: {
            color: "white",
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        header: {
          background: "secondary",
        },
        body: {
          background: "secondary",
        },
        footer: {
          background: "secondary",
        },
      },
    },
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "PloniRegular",
      },
      h1: {
        fontSize: "4xl",
        fontFamily: "PloniBold",
      },
      h2: {
        fontSize: "3xl",
        fontFamily: "PloniBold",
      },
      h3: {
        fontSize: "2xl",
        fontFamily: "PloniBold",
      },
      h4: {
        fontSize: "xl",
        fontFamily: "PloniBold",
      },
      p: {
        fontSize: "larger",
      },
      "article a": {
        fontSize: "larger",
        _hover: {
          color: "accent.500",
        },
      },
    },
  },
});

export default theme;
