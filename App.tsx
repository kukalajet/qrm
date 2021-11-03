import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { RootStack } from "./src/navigation";

const HomeScreen = ({ navigation }: any) => (
  <View style={styles.container}>
    <Pressable onPress={() => navigation.navigate("Menu")}>
      <Text>Home</Text>
    </Pressable>
  </View>
);
const MenuScreen = () => (
  <View style={styles.container}>
    <Text>Menu</Text>
  </View>
);

const Root = () => (
  <RootStack.Navigator initialRouteName="Home">
    <RootStack.Screen name="Home" component={HomeScreen} />
    <RootStack.Screen name="Menu" component={MenuScreen} />
  </RootStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
