import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FloatingActionButton, Modal, TextInput } from "../components";
import { makeStyles } from "../hooks";
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
      <TextInput label="Fo" multiline containerStyle={styles.input} />
      <TextInput
        label="Food name Food name Food name"
        error="Second error, why don't you type it correctly?"
        containerStyle={styles.input}
      />
      <TextInput
        label="Food name Food"
        error="Second error, why don't you type it correctly?"
        containerStyle={styles.input}
      />
      <TextInput
        label="Food name Food Food name Food Food name Fo"
        error="Second error, why don't you type it correctly?"
        containerStyle={styles.input}
      />
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
