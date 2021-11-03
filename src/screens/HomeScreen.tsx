import React from "react";
import { Pressable, View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { makeStyles } from "../hooks";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "Home"
>;
type HomeScreenProps = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Menu")}>
        <Text>Home</Text>
      </Pressable>
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

export default HomeScreen;
