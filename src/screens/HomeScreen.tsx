import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Modal,
  TextInput,
  Button,
  FloatingActionButton,
} from "../components/ui";
import { makeStyles } from "../hooks";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { MenuCreationForm } from "../forms/menu";
import { PortalHost } from "@gorhom/portal";
import { useMenuStore } from "../stores/menu";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "Home"
>;
type HomeScreenProps = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = useStyles();

  const menus = useMenuStore((state) => state.menus);
  const fetchMenus = useMenuStore((state) => state.fetchMenus);

  // testing
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchMenus();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          label="Test"
          onPress={() => console.log("PRESSED!!!")}
          icon={
            <Feather name="arrow-left" size={24} color={colors.onPrimary} />
          }
          containerStyle={styles.button}
        />
        <Button
          label="Test"
          type="text"
          loading={loading}
          onPress={() => navigation.navigate("Menu")}
          icon={<Feather name="award" size={24} color={colors.primary} />}
          containerStyle={styles.button}
        />
        <Text>{JSON.stringify(menus)}</Text>
        <PortalHost name="main" />
        <Modal
          label="Test Hey"
          description="Test Hey description"
          open={open}
          withScrollView
          onRemove={() => setOpen(false)}
          onDismiss={() => setOpen(false)}
        >
          <MenuCreationForm onPress={() => setOpen((value) => !value)} />
        </Modal>
      </ScrollView>
      <FloatingActionButton onPress={() => setOpen((state) => !state)} />
    </SafeAreaView>
  );
};

const useStyles = makeStyles(() => ({
  container: { flex: 1 },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
}));

export default HomeScreen;
