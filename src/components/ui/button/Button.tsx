import React, { ReactElement, useState } from "react";
import {
  Pressable,
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { makeStyles } from "../../../hooks";

type Type = "contained" | "outlined" | "text";

type Props = {
  type?: Type;
  label: String;
  icon?: ReactElement;
  onPress: () => void;
  width?: string | number;
  height?: number;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const Button = ({
  type = "contained",
  label,
  icon,
  onPress,
  width,
  height = 40,
  loading,
  containerStyle,
}: Props) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = useStyles({ height, width, pressed, type });
  const indicatorColor =
    type === "contained" ? colors.onPrimary : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[styles.container, containerStyle]}
    >
      {!!loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <React.Fragment>
          {!!icon && <View style={styles.icon}>{icon}</View>}
          <Text style={styles.label}>{label}</Text>
        </React.Fragment>
      )}
    </Pressable>
  );
};

type StylesProps = {
  width?: string | number;
  height?: number;
  pressed: boolean;
  type: Type;
};

const useStyles = makeStyles(
  ({ width, height, pressed, type }: StylesProps) => {
    const { colors } = useTheme();
    const backgroundColor = type === "contained" ? colors.primary : undefined;
    const labelColor = type === "contained" ? colors.onPrimary : colors.primary;
    const borderColor = type === "outlined" ? colors.primary : undefined;
    const borderWidth = type === "outlined" ? 1 : 0;

    return {
      container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        width: width,
        borderRadius: height ? height / 2 : 20,
        backgroundColor: !pressed ? backgroundColor : colors.primaryVariant,
        borderColor: borderColor,
        borderWidth: borderWidth,
      },
      label: {
        fontSize: 24,
        fontFamily: "SF-Pro-Rounded-Medium",
        color: labelColor,
        paddingHorizontal: 16,
      },
      icon: {
        paddingHorizontal: 16,
      },
    };
  }
);

export default Button;
