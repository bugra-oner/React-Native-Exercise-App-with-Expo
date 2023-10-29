import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { hp } from "../../utils";

const GradientInput = ({ placeholder, onChangeText, keyboardType, colors }) => {
  return (
    <LinearGradient
      colors={colors || ["#575ea8", "#83c29f"]} // Default renkler
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradientContainer}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#fff" // Placeholder rengi
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
    elevation: 5,
  },
  input: {
    paddingLeft: 10,
    padding: hp(0, 7),
    color: "white",
  },
});

export default GradientInput;
