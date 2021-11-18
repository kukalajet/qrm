import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { loadAsync } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RootStack } from "./src/navigation";
import { HomeScreen, MenuScreen } from "./src/screens";
import theme from "./src/configs/theme";

function fetchFonts() {
  return loadAsync({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });
}

const Root = () => (
  <RootStack.Navigator initialRouteName="Home">
    <RootStack.Screen name="Home" component={HomeScreen} />
    <RootStack.Screen name="Menu" component={MenuScreen} />
  </RootStack.Navigator>
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  const cacheResources = async () => {
    const initFonts = fetchFonts();

    return Promise.all([initFonts]);
  };

  const onFinish = useCallback(() => {
    setFontLoaded(true);
  }, []);

  if (!fontLoaded) {
    return (
      // TODO: `AppLoading` should be updated. Is it deprecated?
      <AppLoading
        // @ts-expect-error: fix typing error, why doesn't it match?
        startAsync={cacheResources}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }

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
