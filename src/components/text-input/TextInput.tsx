import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputContentSizeChangeEventData,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { makeStyles } from "../../hooks";

type State = "default" | "error" | "disabled";

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  height?: number | string;
  width?: number | string;
  disabled?: boolean;
  multiline?: boolean;
  pressable?: boolean;
  onChangeText?: (value: string) => void;
  leadingIcon?: React.ReactElement;
  trailingIcon?: React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
};

const TextInput = ({
  label,
  value,
  placeholder,
  error,
  height,
  width = "100%",
  disabled,
  multiline,
  pressable,
  onChangeText,
  leadingIcon,
  trailingIcon,
  containerStyle,
}: Props) => {
  const [state, setState] = useState<State>("default");
  const [focused, setFocused] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);
  const [currentHeight, setCurrentHeight] = useState<
    number | string | undefined
  >(height);

  const styles = useStyles({
    height: currentHeight,
    width,
    state,
    focused,
    hovered,
    disabled,
    hasLeadingIcon: !!leadingIcon,
    hasTrailingIcon: !!trailingIcon,
  });

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

  const handleOnChangeText = (value: string) => {
    setCurrentValue(value);
    if (onChangeText) {
      onChangeText(value);
    }
  };

  const handleOnFocus = (
    value: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setFocused(true);
    setHovered(true);
  };

  const handleOnBlur = (
    value: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setFocused(false);
    setHovered(false);
  };

  const handleOnContainerSizeChange = (
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    if (multiline) {
      setCurrentHeight(event.nativeEvent.contentSize.height);
    }
  };

  return (
    <View
      // @ts-expect-error
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={StyleSheet.flatten([styles.container, containerStyle])}
    >
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View
        pointerEvents={pressable ? "auto" : "none"}
        style={styles.inputContainer}
      >
        {!!leadingIcon && <View style={styles.icon}>{leadingIcon}</View>}
        <RNTextInput
          value={currentValue}
          placeholder={placeholder}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChangeText={handleOnChangeText}
          onContentSizeChange={handleOnContainerSizeChange}
          multiline={multiline}
          editable={!disabled}
          scrollEnabled={false}
          style={styles.input}
        />
        {!!trailingIcon && <View style={styles.icon}>{trailingIcon}</View>}
      </View>
      {!!error && !disabled && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

type StylesProps = {
  state?: State;
  height?: number | string;
  width?: number | string;
  focused?: boolean;
  hovered?: boolean;
  disabled?: boolean;
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
};

const useStyles = makeStyles(
  ({
    state,
    height,
    width,
    focused,
    hovered,
    disabled,
    hasLeadingIcon,
    hasTrailingIcon,
  }: StylesProps) => {
    const { colors } = useTheme();
    const bottomBorderColor = getActiveColors(state, focused, hovered);

    return {
      container: {
        width: width,
        justifyContent: "center",
        shadowColor: colors.onSurface,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.125,
        shadowRadius: 1,
        elevation: 1,
      },
      inputContainer: {
        flexDirection: "row",
        borderBottomColor: bottomBorderColor,
        borderRadius: 6,
        backgroundColor: "#ECEFF1",
        shadowColor: colors.onSecondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.125,
        shadowRadius: 2,
        elevation: 2,
        borderBottomWidth: 3,
      },
      label: {
        color: disabled ? `${colors.onSurface}90` : undefined,
        paddingBottom: 2,
        paddingHorizontal: 4,
      },
      input: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingStart: hasLeadingIcon ? undefined : 8,
        paddingEnd: hasTrailingIcon ? undefined : 8,
        paddingTop: 16,
        paddingBottom: 12,
      },
      error: {
        fontSize: 16,
        paddingTop: 1,
        paddingHorizontal: 4,
        color: colors.error,
      },
      icon: { justifyContent: "center", padding: 8 },
    };
  }
);

function getActiveColors(state?: State, focused?: boolean, hovered?: boolean) {
  const { colors } = useTheme();

  if (state === "error") {
    if (hovered) return colors.error;
    return `${colors.error}95`;
  }
  if (state === "disabled") return `${colors.surface}90`;
  if (focused) return colors.primary;
  if (hovered) return colors.primaryVariant;

  return colors.onSurface;
}

export default TextInput;
