import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
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
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

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
      <ScrollView>
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
        <View
          style={{
            paddingVertical: 16,
          }}
        >
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
            loading={loading}
            onPress={() => setLoading((value) => !value)}
            containerStyle={styles.button}
          />
          <Button
            label="Test"
            type="outlined"
            loading={loading}
            onPress={() => console.log("PRESSED!!!")}
            icon={<Feather name="arrow-up" size={24} color={colors.primary} />}
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
          <View style={{ height: 200, backgroundColor: colors.background }} />
        </View>
        <Modal
          label="Test Hey"
          description="Test Hey description"
          open={open}
          onRemove={() => setOpen(false)}
          onDismiss={() => setOpen(false)}
        >
          <BottomSheetScrollView>
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
          </BottomSheetScrollView>
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
