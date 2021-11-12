import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

type Props = {
  open: boolean;
  size?: ModalSize;
  onDismiss: () => void;
};

const Modal = ({ open, size = "medium", onDismiss }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => getSnapPoints(size), []);
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (open) bottomSheetRef.current?.present();
    if (!open) bottomSheetRef.current?.dismiss();
  }, [open]);

  const handleDismiss = useCallback(() => {
    onDismiss();
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
        <Text>Text</Text>
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

export default Modal;
