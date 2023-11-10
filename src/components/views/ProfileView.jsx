import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { wp, hp, fp } from "../../utils";

export default function ProfileView() {
  return (
    <View style={styles.container}>
      <View style={styles.TextView}>
        <Text style={styles.titleText}>Ali Güngören</Text>
        <Text style={styles.genderText}>Erkek</Text>
      </View>
      <TouchableOpacity style={styles.touchableOpacity}>
        <Text style={styles.buttonText}>Düzenle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(90),
    alignSelf: "center",
    marginTop: hp(5),
  },
  TextView: {},
  titleText: {},
  genderText: {},
  buttonText: {
    padding: 10,
  },
  touchableOpacity: {
    textAlign: "center",
    backgroundColor: "#F3F5FF",
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
