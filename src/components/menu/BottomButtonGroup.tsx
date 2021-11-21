import React, { ReactElement } from "react";
import { View } from "react-native";
import { Button, FloatingActionButton } from "../ui";
import { makeStyles } from "../../hooks";

type Props = {
  leftButtonLabel: string;
  leftButtonIcon: ReactElement;
  onLeftButtonPress: () => void;
  onFabPress: () => void;
};

const BottomButtonGroup = ({
  leftButtonLabel,
  leftButtonIcon,
  onLeftButtonPress,
  onFabPress,
}: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Button
        label={leftButtonLabel}
        width="100%"
        icon={leftButtonIcon}
        onPress={onLeftButtonPress}
      />
      <FloatingActionButton
        onPress={onFabPress}
        containerStyle={styles.fabContainer}
      />
    </View>
  );
};

type StylesProps = {};

const useStyles = makeStyles(({}: StylesProps) => ({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
  },
  fabContainer: {
    position: "relative",
    bottom: 0,
  },
}));

export default BottomButtonGroup;
