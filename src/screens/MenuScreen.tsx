import React from "react";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { makeStyles } from "../hooks";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useTheme } from "@react-navigation/native";
import { BottomButtonGroup } from "../components/menu";

type MenuScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "Menu"
>;
type ListScreenRouteProp = RouteProp<RootStackParams, "Menu">;
type MenuScreenProps = {
  navigation: MenuScreenNavigationProp;
  route: ListScreenRouteProp;
};

const MenuScreen = ({ navigation, route }: MenuScreenProps) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const menu = route.params?.menu;

  return (
    <View style={styles.container}>
      <Text>{menu?.title}</Text>
      <BottomButtonGroup
        leftButtonLabel="Generate QR"
        onLeftButtonPress={() => console.log("button pressed")}
        onFabPress={() => console.log("hey!")}
        leftButtonIcon={
          <Ionicons name="ios-qr-code" size={24} color={colors.onPrimary} />
        }
      />
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
