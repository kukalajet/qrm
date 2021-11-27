import React, { ReactElement } from "react";
import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { makeStyles } from "../../../hooks";

type Props = { icon: ReactElement };

const RoundIcon = ({ icon }: Props) => {
  const styles = useStyles();

  return <View style={styles.container}>{icon}</View>;
};

type StylesProps = {
  backgroundColor?: string;
};

const useStyles = makeStyles(({ backgroundColor }: StylesProps) => {
  const { colors } = useTheme();

  return {
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: backgroundColor || colors.secondary,
      borderRadius: 40,
      marginEnd: 16,
      padding: 20,
    },
  };
});

export default RoundIcon;
