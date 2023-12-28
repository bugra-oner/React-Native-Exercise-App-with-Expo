import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { wp, hp, fp } from "../../utils";

import CustomIcon from "../CustomIcon";

export default function ProfileView({ name, gender, fix, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.TextView}>
        <Text style={styles.titleText}>{name ? name : "Anonim"}</Text>
        <Text style={styles.genderText}>
          {gender ? gender : "Belirtilmedi"}
        </Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
        <Text style={styles.buttonText}>Düzenle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 18,
    justifyContent: "space-between",
    width: wp(90),
    alignSelf: "center",
    marginTop: hp(5),
    borderRadius: 7,
    borderColor: "black",
    backgroundColor: "#ffff",
    shadowColor: "#000000", // Gölgenin rengini burada belirleyebilirsiniz
    shadowOpacity: 0.8, // Gölgenin opaklığını burada belirleyebilirsiniz
    shadowRadius: 7.604332447052002, // Gölgenin yuvarlaklık derecesini burada belirleyebilirsiniz
    shadowOffset: { width: 2.3208664655685425, height: 2.3208664655685425 }, // Gölgenin konumunu burada belirleyebilirsiniz
    elevation: 10, // Sadece Android için shadow (iOS bu prop'u kullanmaz)
  },
  TextView: {
    backgroundColor: "#ffffff",
    padding: hp(1),
    borderRadius: 2,
    borderColor: "black",
    backgroundColor: "#ffffff29",
    shadowColor: "#000000", // Gölgenin rengini burada belirleyebilirsiniz
    shadowOpacity: 0.6, // Gölgenin opaklığını burada belirleyebilirsiniz
    shadowRadius: 7.604332447052002, // Gölgenin yuvarlaklık derecesini burada belirleyebilirsiniz
    shadowOffset: { width: 2.3208664655685425, height: 2.3208664655685425 }, // Gölgenin konumunu burada belirleyebilirsiniz
    elevation: 2, // Sadece Android için shadow (iOS bu prop'u kullanmaz)
  },
  titleText: { fontSize: fp(2.4) },
  genderText: { fontSize: fp(2.2) },
  buttonText: {
    padding: 10,
  },
  touchableOpacity: {
    textAlign: "center",
    backgroundColor: "#f3f5ffd6",
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
});
