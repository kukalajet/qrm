import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { makeStyles } from "../../hooks";

type Props = {
  iconName?: string;
  onPress: () => void;
};

const FloatingActionButton = ({ iconName = "plus", onPress }: Props) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const { colors } = useTheme();
  const styles = useStyles({ pressed: pressed });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={styles.fab}
      >
        <Feather
          // @ts-expect-error: there is no icon name type provided
          name={iconName}
          size={24}
          color={colors.onPrimary}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

type StylesProps = {
  pressed: boolean;
};

const useStyles = makeStyles(({ pressed }: StylesProps) => {
  const { colors } = useTheme();

  return {
    container: {
      alignSelf: "center",
      position: "absolute",
      bottom: 56,
    },
    fab: {
      borderRadius: 28,
      backgroundColor: pressed ? colors.primaryVariant : colors.primary,
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
