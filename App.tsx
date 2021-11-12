import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./src/navigation";
import { HomeScreen, MenuScreen } from "./src/screens";
import theme from "./src/configs/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const Root = () => (
  <RootStack.Navigator initialRouteName="Home">
    <RootStack.Screen name="Home" component={HomeScreen} />
    <RootStack.Screen name="Menu" component={MenuScreen} />
  </RootStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <BottomSheetModalProvider>
        <Root />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
