import React, { useCallback, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { MotiPressable, MotiPressableProp } from "@motify/interactions";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { makeStyles } from "../../../hooks";

type Alignment = "left" | "center" | "right";

type Props = {
  iconName?: string;
  alignment?: Alignment;
  onPress: () => void;
  fabContainer?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

// https://github.com/facebook/react-native/issues/28697
const FloatingActionButton = ({
  iconName = "plus",
  alignment = "center",
  onPress,
  containerStyle,
}: Props) => {
  const { colors } = useTheme();
  const styles = useStyles({ alignment });

  const animate: MotiPressableProp = useCallback(({ hovered, pressed }) => {
    "worklet";

    return {
      opacity: pressed ? 0.75 : 1,
      scale: pressed ? 0.9 : 1,
    };
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <MotiPressable onPress={onPress} animate={animate} style={styles.fab}>
        <Feather
          // @ts-expect-error: there is no icon name type provided
          name={iconName}
          size={24}
          color={colors.onPrimary}
          style={styles.icon}
        />
      </MotiPressable>
    </View>
  );
};

type StylesProps = { alignment: Alignment };

const useStyles = makeStyles(({ alignment }: StylesProps) => {
  const { colors } = useTheme();
  const left = alignment === "left" ? 16 : undefined;
  const right = alignment === "right" ? 16 : undefined;

  return {
    container: {
      alignSelf: "center",
      position: "absolute",
      bottom: 40,
      left: left,
      right: right,
    },
    fab: {
      borderRadius: 28,
      margin: 8,
      backgroundColor: colors.primary,
      shadowColor: colors.onBackground,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 4,
    },
    icon: {
      padding: 16,
    },
  };
});

export default FloatingActionButton;
