import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FloatingActionButton, Modal, TextInput, Button } from "../components";
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

  // testing
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput label="Fo" multiline containerStyle={styles.input} />
      <TextInput
        label="Food name Food"
        error="Second error, why don't you type it correctly?"
        containerStyle={styles.input}
      />
      <TextInput
        label="Food name Food"
        placeholder="Food name placeholder"
        containerStyle={styles.input}
      />
      <TextInput
        disabled
        label="Food name Food"
        placeholder="Food name placeholder"
        error="Second error, why don't you type it correctly?"
        containerStyle={styles.input}
      />
      <Button
        label="Test"
        onPress={() => console.log("PRESSED!!!")}
        containerStyle={styles.button}
      />
      <Button
        label="Test"
        loading={loading}
        onPress={() => setLoading((value) => !value)}
        containerStyle={styles.button}
      />
      <Button
        label="Test"
        type="outlined"
        loading={loading}
        onPress={() => setLoading((value) => !value)}
        containerStyle={styles.button}
      />
      <Button
        label="Test"
        type="text"
        loading={loading}
        onPress={() => setLoading((value) => !value)}
        containerStyle={styles.button}
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
              height: 50,
              marginHorizontal: 16,
              backgroundColor: "red",
            }}
          />
          <TextInput
            label="Food name Food"
            multiline
            containerStyle={styles.input}
          />
          <TextInput
            label="Food name Food"
            error="Second error, why don't you type it correctly?"
            containerStyle={styles.input}
          />
          <TextInput
            label="Food name Food"
            placeholder="Food name placeholder"
            containerStyle={styles.input}
          />
          <TextInput
            disabled
            label="Food name Food"
            placeholder="Food name placeholder"
            error="Second error, why don't you type it correctly?"
            containerStyle={styles.input}
          />
          <Button
            label="Test"
            height={48}
            onPress={() => console.log("PRsSSED!!!")}
            containerStyle={styles.button}
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
  button: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
}));

export default HomeScreen;
