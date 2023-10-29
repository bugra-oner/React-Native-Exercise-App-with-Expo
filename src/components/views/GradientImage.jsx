import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";

import colors from "../../constants/colors";
import { hp, fp, wp } from "../../utils";

export default function GradientImage({
  colorsOne,
  colorsTwo,
  textOne,
  textTwo,
  textThree,
}) {
  return (
    <TouchableOpacity>
      <LinearGradient
        style={styles.container}
        colors={[
          colorsOne ? colorsOne : colors.gradientColor.workoutOne,
          colorsTwo ? colorsTwo : colors.gradientColor.workoutTwo,
        ]}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../../assets/spartan-woman.png")}
        />
        <View style={styles.TextView}>
          <Text style={styles.Text}>{textOne}</Text>
          <Text style={styles.subText}>{textTwo}</Text>
          <Text style={styles.Text}>{textThree}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(14),
    alignSelf: "center",
    marginVertical: hp(4),
    flexDirection: "row",
    borderRadius: 15,
  },
  image: {
    width: wp(30),
    height: hp(14),
    marginLeft: hp(2.2),
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
    fontSize: fp(2.2),
  },
  subText: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: fp(1.5),
  },
});
