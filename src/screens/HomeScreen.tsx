import React from "react";
import { SafeAreaView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FloatingActionButton } from "../components";
import { makeStyles } from "../hooks";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "Home"
>;
type HomeScreenProps = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <FloatingActionButton onPress={() => navigation.navigate("Menu")} />
    </SafeAreaView>
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
