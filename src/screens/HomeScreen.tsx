import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FloatingActionButton, Modal } from "../components";
import { makeStyles } from "../hooks";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "Home"
>;
type HomeScreenProps = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        label="Test Hey"
        description="Test Hey description"
        open={open}
        onRemove={() => setOpen(false)}
        onDismiss={() => setOpen(false)}
      >
        <View
          style={{
            height: 100,
            marginHorizontal: 16,
            backgroundColor: "red",
          }}
        />
      </Modal>
      <FloatingActionButton onPress={() => setOpen((state) => !state)} />
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
