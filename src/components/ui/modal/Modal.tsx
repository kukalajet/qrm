import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { makeStyles } from "../../../hooks";

type Props = {
  open: boolean;
  label?: string;
  description?: string;
  size?: ModalSize;
  children: React.ReactChild;
  withScrollView?: boolean;
  onDismiss: () => void;
  onRemove?: () => void;
};

const Modal = ({
  children,
  open,
  label,
  description,
  size = "medium",
  withScrollView = false,
  onDismiss,
  onRemove,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => getSnapPoints(size), []);
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  useEffect(() => {
    if (open) bottomSheetRef.current?.present();
    if (!open) bottomSheetRef.current?.dismiss();
  }, [open]);

  const handleDismiss = useCallback(() => {
    onDismiss();
  }, []);

  const handleOnRemove = useCallback(() => {
    if (onRemove) onRemove();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <React.Fragment>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onDismiss={handleDismiss}
        backdropComponent={renderBackdrop}
        bottomInset={bottom}
        index={snapPoints.length - 1}
        keyboardBehavior="interactive"
      >
        <React.Fragment>
          {(!!onRemove || !!label) && (
            <View style={styles.header}>
              {!!label && <Text style={styles.label}>{label}</Text>}
              {!!onRemove && (
                <Feather
                  name={"x"}
                  size={24}
                  color={colors.onBackground}
                  onPress={handleOnRemove}
                />
              )}
            </View>
          )}
          {!!description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </React.Fragment>
        {withScrollView ? (
          <BottomSheetScrollView>children</BottomSheetScrollView>
        ) : (
          children
        )}
      </BottomSheetModal>
    </React.Fragment>
  );
};

function getSnapPoints(size: ModalSize): string[] {
  switch (size) {
    case "small":
      return ["30%", "50%"];
    case "medium":
      return ["35%", "70%"];
    case "large":
      return ["45%", "90%"];
    default:
      return ["75%"];
  }
}

const useStyles = makeStyles(() => ({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 24,
  },
  description: {
    fontSize: 14,
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
}));

export default Modal;
