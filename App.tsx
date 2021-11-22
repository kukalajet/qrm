import React from "react";
import { useFonts } from "expo-font";
import { PortalProvider } from "@gorhom/portal";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { RootStack } from "./src/navigation";
import { HomeScreen, MenuScreen } from "./src/screens";
import theme from "./src/configs/theme";

const Root = () => (
  <RootStack.Navigator initialRouteName="Home">
    <RootStack.Screen name="Home" component={HomeScreen} />
    <RootStack.Screen name="Menu" component={MenuScreen} />
  </RootStack.Navigator>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Rounded-Bold": require("./assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "SF-Pro-Rounded-Heavy": require("./assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    "SF-Pro-Rounded-Medium": require("./assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "SF-Pro-Rounded-Regular": require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "SF-Pro-Rounded-Semibold": require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer theme={theme}>
      <BottomSheetModalProvider>
        <PortalProvider>
          <Root />
        </PortalProvider>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
