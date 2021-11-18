import { DefaultTheme, ExtendedTheme } from "@react-navigation/native";

// TODO: add dark theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200EE",
    primaryVariant: "#3700B3",
    secondary: "#03DAC6",
    secondaryVariant: "#018786",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    error: "#B00020",
    success: "#2E7D32",
    onPrimary: "#FFFFFF",
    onSecondary: "#212121",
    onBackground: "#212121",
    onSurface: "#212121",
    onError: "#FFFFFF",
    onSuccess: "#FFFFFF",
  },
};

declare module "@react-navigation/native" {
  export type ExtendedTheme = typeof theme;
  export function useTheme(): ExtendedTheme;
}

export default theme;
