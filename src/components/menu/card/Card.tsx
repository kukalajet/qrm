import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MotiPressable, MotiPressableProp } from "@motify/interactions";
import { RoundIcon } from "../round-icon";
import { makeStyles } from "../../../hooks";
import { HomeScreenNavigationProp } from "../../../screens/HomeScreen";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  menu: Menu;
};

const Card = ({ menu }: Props) => {
  const styles = useStyles();
  const navigation = useNavigation() as HomeScreenNavigationProp;

  const title = menu?.title;
  const description = menu?.description;
  const categoryLength = menu?.categories?.length;
  const foodLength = menu?.categories?.reduce(
    (previous, current) => previous + current.foods.length,
    0
  );

  const handleOnPress = useCallback(() => {
    navigation.navigate("Menu", { menu });
  }, [menu]);

  const animate: MotiPressableProp = useCallback(({ hovered, pressed }) => {
    "worklet";

    return {
      opacity: pressed ? 0.75 : 1,
      scale: pressed ? 0.9 : 1,
    };
  }, []);

  return (
    <MotiPressable
      onPress={handleOnPress}
      animate={animate}
      style={styles.container}
    >
      <RoundIcon icon={<MaterialIcons name="local-restaurant" size={24} />} />
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.details}>
          <Text style={styles.detail}>categories: {categoryLength}</Text>
          <Text style={styles.detail}>items: {foodLength}</Text>
        </View>
      </View>
    </MotiPressable>
  );
};

const useStyles = makeStyles(() => {
  const { colors } = useTheme();

  return {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: "row",
    },
    description: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    details: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 20,
      fontFamily: "SF-Pro-Rounded-Medium",
      color: colors.onSecondary,
    },
    detail: {
      fontSize: 16,
      fontFamily: "SF-Pro-Rounded-Regular",
      color: colors.onSecondary,
    },
  };
});

export default Card;
