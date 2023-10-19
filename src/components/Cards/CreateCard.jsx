import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import BenchHome from "../../assets/BenchHome.svg";
import typography from "../../constants/typography";
import colors from "../../constants/colors";
import { useTranslation } from "react-i18next";

import { hp, wp, fp } from "../../utils";

export default function CreaterCard({ onPress, marginTop, height = hp(15) }) {
  const { t, i18n } = useTranslation();

  return (
    <LinearGradient
      colors={[colors.gradientColor.color, colors.gradientColor.colorTwo]}
      style={[styles.container, { marginTop: marginTop, height: height }]}
    >
      <View style={styles.topContainerView}>
        <Text style={styles.titleText}>{t("readyProgram")}</Text>
        <Text style={styles.subTitleText}>{t("readyProgramSubtitle")}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Text style={styles.buttonText}>{t("nowStart")}</Text>
        </TouchableOpacity>
      </View>

      <BenchHome width={wp(55)} height={hp(25)} style={styles.benchHome} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    shadowColor: "#7b7b82",
    shadowOpacity: 0.7,
    shadowRadius: 1.3208664655685425,
    borderRadius: 13.21,
    elevation: 1, // Use elevation to display shadow on Android
    alignSelf: "center",
    flexDirection: "row",
    height: 10,
    backgroundColor: "red",
  },
  topContainerView: {
    width: "50%",
    height: "89%",
    marginLeft: "4%",
    marginTop: "2.2%",
  },
  titleText: {
    fontWeight: "700",
    color: "white",
    fontSize: typography.title,
  },
  subTitleText: {
    color: "white",
    fontSize: fp(1.1),
    marginTop: 5,
    maxWidth: "100%",
    fontWeight: "600",
  },
  buttonContainer: {
    backgroundColor: "#F3F5FF",
    borderRadius: 5,
    width: "60%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center", // Aynı zamanda yazıyı yatayda ve dikeyde ortalayacağız
    marginTop: hp(2),
    padding: hp(0.6),
    height: hp(4.3),
  },
  buttonText: {
    color: "#3d4160",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: fp(1.6),
  },
  benchHome: {
    right: 50, // Sağ kenardan 10 birim uzaklıkta
    top: -42, // Üst kenardan 20 birim yukarıda
  },
});
