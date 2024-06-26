import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";

import colors from "../../constants/colors";

export default function LinearView({
  children,
  colorsOne,
  colorsTwo,
  style,
  customGradient,
  startOne = 0,
  startTwo = 0,
  endOne = 0,
  endTwo = 1,
}) {
  return (
    <LinearGradient
      style={[style ? style : styles.container]}
      colors={[
        colorsOne ? colorsOne : colors.gradientColor.workoutOne,
        colorsTwo ? colorsTwo : colors.gradientColor.workoutTwo,
      ]}
      start={[startOne, startTwo]}
      end={[endOne, endTwo]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: "25%",
  },
});
