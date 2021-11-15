import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextLayoutEventData,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  useDerivedValue,
  Extrapolate,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { makeStyles } from "../../hooks";

type State = "default" | "error" | "disabled";

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  width?: number | string;
  disabled?: boolean;
  multiline?: boolean;
  pressable?: boolean;
  onChangeText?: (value: string) => void;
  icon?: React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
};

const TimeConfigurations = { duration: 50, easing: Easing.circle };

const TextInput = ({
  label,
  value,
  placeholder,
  error,
  width = "100%",
  disabled,
  multiline,
  onChangeText,
  icon,
  containerStyle,
}: Props) => {
  const [state, setState] = useState<State>("default");
  const [focused, setFocused] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);
  const [labelWidth, setLabelWidth] = useState<number>(0);

  const transition = useDerivedValue(() => {
    return focused || hovered || !!currentValue
      ? withTiming(1, TimeConfigurations)
      : withTiming(0, TimeConfigurations);
  });
  const animatedLabelStyle = useAnimatedStyle(() => {
    const offset = Math.round((labelWidth - labelWidth * 0.8) / 2);
    const toX = labelWidth > 32 ? 16 - offset : 16;
    console.log(`toX: ${toX}`);

    const scale = interpolate(
      transition.value,
      [0, 1],
      [1, 0.8],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      transition.value,
      [0, 1],
      [16, 0],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      transition.value,
      [0, 1],
      [16, toX],
      Extrapolate.CLAMP
    );

    return { transform: [{ scale }, { translateX }, { translateY }] };
  });

  const styles = useStyles({
    width,
    state,
    focused,
    hovered,
    disabled,
    hasIcon: !!icon,
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

  const handleOnChangeText = useCallback((value: string) => {
    setCurrentValue(value);
    if (onChangeText) {
      onChangeText(value);
    }
  }, []);

  const handleOnFocus = useCallback(
    (value: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      setHovered(true);
    },
    []
  );

  const handleOnBlur = useCallback(
    (value: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      setHovered(false);
    },
    []
  );

  const handleOnLabelLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      console.log(`width: ${event.nativeEvent.lines[0].width}`);
      setLabelWidth(event.nativeEvent.lines[0].width);
    },
    []
  );

  return (
    <View
      // @ts-expect-error
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={StyleSheet.flatten([styles.container, containerStyle])}
    >
      <View style={styles.inputContainer}>
        {!!label && (
          <Animated.Text
            onTextLayout={handleOnLabelLayout}
            style={[styles.label, animatedLabelStyle]}
          >
            {label}
          </Animated.Text>
        )}
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
        {!!icon && <View style={styles.icon}>{icon}</View>}
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
  hasIcon?: boolean;
};

const useStyles = makeStyles(
  ({ state, width, focused, hovered, disabled, hasIcon }: StylesProps) => {
    const { colors } = useTheme();
    const activeColor = getActiveColors(state, focused, hovered);

    return {
      container: {
        width: width,
        justifyContent: "center",
        shadowColor: colors.onSurface,
      },
      inputContainer: {
        flexDirection: "row",
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 16,
        borderTopEndRadius: 4,
        borderBottomWidth: 2,
        borderTopStartRadius: 4,
        borderBottomColor: activeColor,
        backgroundColor: `${colors.onSurface}12`,
        shadowColor: colors.onPrimary,
      },
      label: {
        position: "absolute",
        fontSize: 20,
        color: activeColor,
        alignItems: "flex-start",
      },
      input: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        paddingTop: 8,
      },
      error: {
        fontSize: 12,
        paddingVertical: 1,
        paddingHorizontal: 16,
        color: colors.error,
      },
      icon: {
        justifyContent: "center",
      },
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

  return "#90A4AE";
}

export default TextInput;
