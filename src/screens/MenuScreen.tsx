import React from "react";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { makeStyles } from "../hooks";

type MenuScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "Menu"
>;
type MenuScreenProps = { navigation: MenuScreenNavigationProp };

const MenuScreen = ({ navigation }: MenuScreenProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>Menu</Text>
    </View>
  );
};

type StylesProps = {};

const useStyles = makeStyles(({}: StylesProps) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default MenuScreen;
