import { StyleSheet } from "react-native";

export const makeStyles =
  <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>, V>(
    styles: T | ((props: V) => T)
  ) =>
  (props: V = {} as any): T => {
    const css = typeof styles === "function" ? styles(props) : styles;

    return StyleSheet.create(css);
  };

export default makeStyles;
