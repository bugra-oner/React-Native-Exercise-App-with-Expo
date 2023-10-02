import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";

import colors from "../../constants/colors";
import { hp, fp, wp } from "../../utils";

export default function StatsImage({
  colorsOne,
  colorsTwo,
  colorsThree,
  colorsFour,
  colorsZero,
  colorsFive,
  textOne,
  textTwo,
  textThree,
}) {
  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={[
          colorsZero ? colorsZero : colors.coachScreen.colors0,
          colorsOne ? colorsOne : colors.coachScreen.color1,
          colorsTwo ? colorsTwo : colors.coachScreen.color2,
          colorsThree ? colorsThree : colors.coachScreen.color3,
          colorsFour ? colorsFour : colors.coachScreen.color4,
          colorsFive ? colorsFive: colors.coachScreen.color5,
        ]}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../../assets/zeus.jpg")}
        />
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(92),
    height: hp(16),
    alignSelf: "center",
    marginVertical: hp(4),
    borderRadius: 15,
  },
  image: {
    width: wp(42),
    height: hp(16),
    alignSelf: "center",
    borderRadius: 50,
  },
  TextView: {
    width: wp(51),
    height: hp(14),
    alignSelf: "center",
    justifyContent: "center",
  },
  Text: {
    textAlign: "center",
    fontWeight: "900",
  },
  textOne:{
    position: "absolute",
  },
  textTwo:{
    position : "absolute",
    marginLeft : 15,
  }
});
