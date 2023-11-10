import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { hp, wp, fp } from "../../utils";
export default function TextCard({ title, subTitle }) {
  return (
    <View style={styles.Card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "#F3F5FF",
    width: wp(27),
    height: hp(9),
    borderRadius: 7,
    borderColor: "black",
    shadowColor: "#000000", // Gölgenin rengini burada belirleyebilirsiniz
    shadowOpacity: 0.8, // Gölgenin opaklığını burada belirleyebilirsiniz
    shadowRadius: 7.604332447052002, // Gölgenin yuvarlaklık derecesini burada belirleyebilirsiniz
    shadowOffset: { width: 2.3208664655685425, height: 2.3208664655685425 }, // Gölgenin konumunu burada belirleyebilirsiniz
    elevation: 15, // Sadece Android için shadow (iOS bu prop'u kullanmaz)
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: fp(2.5),
    fontWeight: "bold",
    color: "#484F88",
  },
  subTitle: {
    fontSize: fp(2),
    fontWeight: "400",
    color: "#484F88",
    opacity: 0.7,
  },
});
