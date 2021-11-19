import { useTheme } from "@react-navigation/native";
import React, { ReactElement } from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { makeStyles } from "../../../hooks";

type Type = "contained" | "outlined" | "text";

type Props = {
  type?: Type;
  label: String;
  icon?: ReactElement;
  onPress: () => void;
  width?: string | number;
  height?: string | number;
  containerStyle?: StyleProp<ViewStyle>;
};

const Button = ({
  type = "contained",
  label,
  icon,
  onPress,
  width,
  height = 40,
  containerStyle,
}: Props) => {
  const styles = useStyles({ height, width });

  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      {!!icon && <View style={styles.icon}>{icon}</View>}
      <Text>{label}</Text>
    </Pressable>
  );
};

type StylesProps = {
  width?: string | number;
  height?: string | number;
};

const useStyles = makeStyles(({ width, height }: StylesProps) => {
  const { colors } = useTheme();

  return {
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: height,
      width: width,
      borderRadius: 20,
      backgroundColor: colors.primary,
    },
    label: {
      paddingHorizontal: 16,
    },
    icon: {
      paddingHorizontal: 16,
    },
  };
});

export default Button;
