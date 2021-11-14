import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FloatingActionButton, Modal, TextInput } from "../components";
import { makeStyles } from "../hooks";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  "Home"
>;
type HomeScreenProps = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput label="Food name" multiline containerStyle={styles.input} />
      <Modal
        label="Test Hey"
        description="Test Hey description"
        open={open}
        onRemove={() => setOpen(false)}
        onDismiss={() => setOpen(false)}
      >
        <React.Fragment>
          <View
            style={{
              height: 100,
              marginHorizontal: 16,
              backgroundColor: "red",
            }}
          />
          <TextInput
            label="Beverage name"
            error="Second error, why don't you type it correctly?"
            trailingIcon={<Feather name={"x"} size={24} color={colors.error} />}
            containerStyle={styles.input}
          />
        </React.Fragment>
      </Modal>
      <FloatingActionButton onPress={() => setOpen((state) => !state)} />
    </SafeAreaView>
  );
};

type StylesProps = {};

const useStyles = makeStyles(({}: StylesProps) => ({
  container: { flex: 1 },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
}));

export default HomeScreen;
