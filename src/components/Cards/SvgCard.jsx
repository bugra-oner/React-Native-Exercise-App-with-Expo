import { StyleSheet, Text, View } from "react-native";
import React from "react";

import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Human from "../../assets/Human.svg";

import { LinearGradient } from "expo-linear-gradient";

import { hp, wp } from "../../utils";

export default function SvgCard({ title, subTitle }) {
  return (
    <LinearGradient
      colors={[colors.gradientColor.colorThree, colors.gradientColor.colorTwo]}
      style={styles.container}
    >
      <Human width={wp(36)} height={hp(10)} style={styles.SvgCard} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(2),
    alignItems: "center",
    borderRadius: 13,
    width: wp(36),
    height: hp(18),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: hp(2), // This adds shadow to Android and is optional
  },
  title: {
    fontSize: typography.title,
    color: colors.title,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: typography.body,
    color: colors.subTitle,
    fontWeight: "700",
    marginTop: hp(0.5),
  },
  SvgCard: {
    position: "auto",
    top: -11,
  },
});
