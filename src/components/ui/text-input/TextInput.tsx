import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { makeStyles } from "../../../hooks";
import { Feather } from "@expo/vector-icons";

type State = "default" | "error" | "disabled";

type Props = {
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  onChangeText?: (value: string) => void;
  multiline?: boolean;
  disabled?: boolean;
  width?: string | number;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
};

const TextInput = ({
  value,
  placeholder,
  label,
  error,
  onChangeText,
  multiline,
  disabled,
  width = "100%",
  containerStyle,
  labelStyle,
  errorStyle,
}: Props) => {
  const [state, setState] = useState<State>("default");
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);
  const [focused, setFocused] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);

  const color = getActiveColor(state, focused, hovered);
  const styles = useStyles({ focused, hovered, disabled, width, color });

  useEffect(() => {
    if (disabled) {
      setState("disabled");
      return;
    }
    if (error) {
      setState("error");
      return;
    }
    setState("default");
  }, [disabled, error]);

  const handleOnFocus = useCallback(
    (_: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      setHovered(true);
    },
    []
  );

  const handleOnBlur = useCallback(
    (_: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      setHovered(false);
    },
    []
  );

  const handleOnChangeText = useCallback((value: string) => {
    setCurrentValue(value);
    if (onChangeText) {
      onChangeText(value);
    }
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <Text numberOfLines={1} style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={styles.field}>
        <RNTextInput
          value={currentValue}
          placeholder={placeholder}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChangeText={handleOnChangeText}
          multiline={multiline}
          editable={!disabled}
          style={styles.input}
        />
        {!!error && (
          <Feather name="x" size={20} color={color} style={styles.icon} />
        )}
      </View>
      {!!error && !disabled && (
        <Text numberOfLines={1} style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

function getActiveColor(state?: State, focused?: boolean, hovered?: boolean) {
  const { colors } = useTheme();

  if (state === "disabled") return `${colors.onSurface}25`;
  if (state === "error") {
    if (focused) return colors.error;
    if (hovered) return `${colors.error}97`;
    return `${colors.error}95`;
  }

  if (focused) return colors.primary;
  if (hovered) return colors.primaryVariant;

  return `${colors.onSurface}75`;
}

type StylesProps = {
  focused?: boolean;
  hovered?: boolean;
  disabled?: boolean;
  color?: string;
  width?: string | number;
};

const useStyles = makeStyles(
  ({ focused, hovered, disabled, color, width }: StylesProps) => {
    const { colors } = useTheme();

    const shadowOffsetWidth = focused ? 2 : 0;
    const shadowOffsetHeight = focused ? 2 : 0;
    const shadowOpacity = focused ? 0.25 : hovered ? 0.125 : 0;
    const shadowRadius = focused ? 2 : 0;
    const elevation = focused ? 4 : 0;

    return {
      container: {
        width: width,
        justifyContent: "center",
      },
      field: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: hovered || focused ? 1.5 : 1.125,
        borderRadius: 8,
        borderColor: color,
        shadowColor: color,
        backgroundColor: disabled ? `${colors.onSurface}10` : colors.surface,
        shadowOffset: { width: shadowOffsetWidth, height: shadowOffsetHeight },
        shadowOpacity: shadowOpacity,
        shadowRadius: shadowRadius,
        elevation: elevation,
      },
      input: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        color: colors.onSurface,
      },
      label: {
        fontSize: 16,
        paddingHorizontal: 8,
        color: !disabled ? colors.onBackground : `${colors.onBackground}75`,
        fontFamily: "SF-Pro-Rounded-Regular",
      },
      error: {
        fontSize: 12,
        paddingHorizontal: 8,
        color: colors.error,
        fontFamily: "SF-Pro-Rounded-Regular",
      },
      icon: { paddingEnd: 8 },
    };
  }
);

export default TextInput;
