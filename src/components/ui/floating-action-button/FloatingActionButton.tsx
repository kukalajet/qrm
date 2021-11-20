import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { MotiPressable, MotiPressableProp } from "@motify/interactions";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { makeStyles } from "../../../hooks";

type Props = {
  iconName?: string;
  onPress: () => void;
};

const FloatingActionButton = ({ iconName = "plus", onPress }: Props) => {
  const { colors } = useTheme();
  const styles = useStyles();

  const animate: MotiPressableProp = useCallback(({ hovered, pressed }) => {
    "worklet";

    return {
      opacity: hovered || pressed ? 0.5 : 1,
      scale: hovered || pressed ? 0.9 : 1,
    };
  }, []);

  return (
    <View style={styles.container}>
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

type StylesProps = {};

const useStyles = makeStyles(({}: StylesProps) => {
  const { colors } = useTheme();

  return {
    container: {
      alignSelf: "center",
      position: "absolute",
      bottom: 56,
    },
    fab: {
      borderRadius: 28,
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
