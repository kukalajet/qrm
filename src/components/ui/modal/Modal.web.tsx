import React, { useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Portal } from "@gorhom/portal";
import { Feather } from "@expo/vector-icons";
import { makeStyles } from "../../../hooks";
import { useTheme } from "@react-navigation/native";

type Props = {
  open: boolean;
  label?: string;
  description?: string;
  size?: ModalSize;
  children: React.ReactElement;
  withClose?: boolean;
  onDismiss?: () => void;
  onRemove?: () => void;
};

const Modal = ({
  open,
  children,
  label,
  description,
  size = "large",
  onDismiss,
  onRemove,
}: Props) => {
  const { colors } = useTheme();
  const styles = useStyles({ size });

  const handleDismiss = useCallback(() => {
    if (onDismiss) onDismiss();
  }, []);

  const handleOnRemove = useCallback(() => {
    if (onRemove) onRemove();
  }, []);

  return (
    <React.Fragment>
      {open && (
        <Portal name="modal">
          <Pressable onPress={handleDismiss} style={styles.backdrop}>
            <Pressable onPress={null} style={styles.modal}>
              {(!!onRemove || !!label) && (
                <View style={styles.labelContainer}>
                  {!!label && <Text style={styles.title}>{label}</Text>}
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
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{description}</Text>
                </View>
              )}
              <React.Fragment>{children}</React.Fragment>
            </Pressable>
          </Pressable>
        </Portal>
      )}
    </React.Fragment>
  );
};

const getWidth = (size: ModalSize): string => {
  switch (size) {
    case "medium":
      return "50%";
    case "large":
      return "65%";
    default:
      return "65%";
  }
};

const getHeight = (size: ModalSize): string => {
  switch (size) {
    case "medium":
      return "75%";
    case "large":
      return "90%";
    default:
      return "90%";
  }
};

type StylesProps = {
  size: ModalSize;
};

const useStyles = makeStyles(({ size }: StylesProps) => {
  const { colors } = useTheme();

  return {
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: `${colors.onBackground}50`,
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      minWidth: 384,
      minHeight: 576,
      width: getWidth(size),
      height: getHeight(size),
      borderRadius: 16,
      backgroundColor: "white",
    },
    title: {
      fontWeight: "bold",
      fontSize: 24,
    },
    description: {
      fontSize: 14,
    },
    labelContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    descriptionContainer: {
      paddingVertical: 2,
      paddingHorizontal: 18,
    },
  };
});

export default Modal;
