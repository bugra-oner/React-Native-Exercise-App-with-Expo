import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { fp, hp, wp } from "../utils";

export default function Button({ title, borderRadius, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { borderRadius: borderRadius }]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#484F88",
    borderRadius: 25,
  },
  text: {
    color: "#F3F5FF",
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    fontSize: fp(2),
  },
});
