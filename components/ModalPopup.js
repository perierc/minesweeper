import { Animated, Easing, Modal, View, StyleSheet } from "react-native";
import { MAX_HEIGHT } from "../constants";
import { useRef, useEffect, useState } from "react";

export default function ModalPopup({ visible, children }) {
  const [showModal, setShowModal] = useState(visible);
  const bottomY = MAX_HEIGHT / 1.5; // Bottom of the screen
  const translateValue = useRef(new Animated.Value(bottomY)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.sequence([
        Animated.timing(translateValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1.4,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setTimeout(() => setShowModal(false), 250);
      Animated.timing(translateValue, {
        toValue: bottomY,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal visible={showModal} transparent>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                { translateY: translateValue },
                { scale: scaleValue },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
