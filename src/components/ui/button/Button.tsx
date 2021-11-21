import React, { ReactElement, useCallback, useState } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { MotiPressable, MotiPressableProp } from "@motify/interactions";
import { useTheme } from "@react-navigation/native";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";
import { makeStyles } from "../../../hooks";

type Type = "contained" | "outlined" | "text";

type Props = {
  type?: Type;
  label: string;
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
  height = 48,
  loading,
  containerStyle,
}: Props) => {
  const { colors } = useTheme();
  const styles = useStyles({ height, width, type });
  const indicatorColor =
    type === "contained" ? colors.onPrimary : colors.primary;

  const handleOnPress = useCallback(() => {
    notificationAsync(NotificationFeedbackType.Success);
    onPress();
  }, []);

  // TODO: Force animation even on "fast press".
  const animate: MotiPressableProp = useCallback(({ hovered, pressed }) => {
    "worklet";

    return {
      opacity: pressed ? 0.5 : 1,
      scale: pressed ? 0.9 : 1,
    };
  }, []);

  return (
    <MotiPressable
      onPress={handleOnPress}
      animate={animate}
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
    </MotiPressable>
  );
};

type StylesProps = {
  width?: string | number;
  height?: number;
  type: Type;
};

const useStyles = makeStyles(({ width, height, type }: StylesProps) => {
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
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: borderWidth,
    },
    label: {
      fontSize: 24,
      fontFamily: "SF-Pro-Rounded-Medium",
      color: labelColor,
      paddingHorizontal: 4,
    },
    icon: {
      paddingHorizontal: 4,
    },
  };
});

export default Button;
