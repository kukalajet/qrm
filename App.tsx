import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Text, View } from "react-native";
import { RootStack } from "./src/navigation";
import { HomeScreen, MenuScreen } from "./src/screens";
import theme from "./src/configs/theme";

const OptionsScreen = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Options</Text>
  </View>
);

const Root = () => (
  <RootStack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerTitleStyle: { fontFamily: "SF-Pro-Rounded-Bold" } }}
  >
    <RootStack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        headerRight: () => (
          <Feather
            name="settings"
            size={24}
            onPress={() => navigation.navigate("Options")}
          />
        ),
        headerShadowVisible: false,
        headerTitleAlign: "center",
      })}
    />
    <RootStack.Screen name="Menu" component={MenuScreen} />
    <RootStack.Screen name="Options" component={OptionsScreen} />
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
