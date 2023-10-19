import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { wp, hp, fp } from "../../utils";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function CategoriesButton({
  title,
  onPress,
  color,
  iconColor,
  size,
  name,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: color }]}
      >
        <MaterialCommunityIcons name={name} size={size} color={iconColor} />
      </TouchableOpacity>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    width: wp(15),
    height: hp(7.2),
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: wp(4.3),
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: fp(1.6),
    fontWeight: "bold",
    textAlign: "center",
    opacity: 0.7,
  },
});
