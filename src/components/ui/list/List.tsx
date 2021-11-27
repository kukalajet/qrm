import { useTheme } from "@react-navigation/native";
import React from "react";
import { ListRenderItem, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { makeStyles } from "../../../hooks";

type Props<T> = {
  label: string;
  renderItem: ListRenderItem<T>;
  data: T[];
  bounces?: boolean;
};

const List = <T extends unknown>({
  label,
  renderItem,
  data,
  bounces = false,
}: Props<T>) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        bounces={bounces}
        contentContainerStyle={{ paddingBottom: 124 }}
      />
    </View>
  );
};

type StylesProps = {};

const useStyles = makeStyles(() => {
  const { colors } = useTheme();

  return {
    container: {},
    label: {
      fontSize: 32,
      fontFamily: "SF-Pro-Rounded-Medium",
      color: colors.onSurface,
      marginHorizontal: 16,
    },
  };
});

export default List;
