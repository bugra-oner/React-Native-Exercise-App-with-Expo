import React from "react";
import { View, StyleSheet } from "react-native";

import DoneButton from "./buttons/DoneButton";

const LevelButtons = ({
  onBeginnerPress,
  onIntermediatePress,
  onAdvancedPress,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <DoneButton
        style={styles.button}
        title="Beginner"
        onPress={onBeginnerPress}
      />
      <DoneButton
        style={styles.button}
        title="Intermediate"
        onPress={onIntermediatePress}
      />
      <DoneButton
        style={styles.button}
        title="Advanced"
        onPress={onAdvancedPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default LevelButtons;
