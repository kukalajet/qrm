import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FloatingActionButton, Modal, TextInput } from "../components";
import { makeStyles } from "../hooks";
import { Feather, Ionicons } from "@expo/vector-icons";
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
      <TextInput
        // label="Response"
        // value="test"
        // error="second error"
        // multiline
        // trailingIcon={<Feather name={"x"} size={24} color={colors.error} />}
        containerStyle={[
          {
            paddingHorizontal: 16,
            paddingVertical: 8,
          },
          { paddingHorizontal: 16 },
        ]}
      />
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
