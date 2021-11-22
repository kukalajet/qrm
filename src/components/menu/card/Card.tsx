import React, { useCallback } from "react";
import { Text } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { MotiPressable, MotiPressableProp } from "@motify/interactions";
import { makeStyles } from "../../../hooks";
import { HomeScreenNavigationProp } from "../../../screens/HomeScreen";

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
      <Text>title: {title}</Text>
      <Text>description: {description}</Text>
      <Text>categoryLength: {categoryLength}</Text>
      <Text>foodLength: {foodLength}</Text>
    </MotiPressable>
  );
};

const useStyles = makeStyles(() => {
  const { colors } = useTheme();

  return {
    container: {
      padding: 16,
      borderRadius: 24,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: colors.secondary,
      shadowColor: colors.onBackground,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 4,
    },
  };
});

export default Card;
