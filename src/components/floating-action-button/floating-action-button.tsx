import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { makeStyles } from "../../hooks";
import { useTheme } from "@react-navigation/native";

type Props = {
  iconName?: string;
  onPress: () => void;
};

const FloatingActionButton = ({ iconName = "plus", onPress }: Props) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = useStyles({
    buttonColor: pressed ? colors.primaryVariant : colors.primary,
    shadowColor: colors.onBackground,
  });

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
  buttonColor: string;
  shadowColor: string;
};

const useStyles = makeStyles(({ buttonColor, shadowColor }: StylesProps) => ({
  container: {
    position: "absolute",
    bottom: 56,
  },
  fab: {
    borderRadius: 28,
    backgroundColor: buttonColor,
    shadowColor: shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  icon: {
    padding: 16,
  },
}));

export default FloatingActionButton;
