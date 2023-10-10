import { StyleSheet, Text, View } from "react-native";
import React from "react";

import colors from "../../constants/colors";
import typography from "../../constants/typography";

import Woman from "../../assets/cards/woman.svg";

import { LinearGradient } from "expo-linear-gradient";
import Button from "../Button";

import { fp, hp, wp } from "../../utils";

export default function IndexCard({
  title,
  subTitle,
  buttonTitle,
  borderRadius,
  onPress,
}) {
  return (
    <LinearGradient
      colors={[colors.gradientColor.colorFour, colors.gradientColor.colorThree]}
      style={styles.container}
    >
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title={buttonTitle}
            borderRadius={borderRadius}
            onPress={onPress}
          />
        </View>
      </View>
      <Woman width={wp(52)} height={hp(21)} style={styles.SvgCard} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    width: wp(94),
    height: hp(22),
    alignSelf: "center",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10, // This adds shadow to Android and is optional
  },
  leftContainer: {
    marginLeft: wp(3),
    width: wp(45),
    alignItems: "center",
  },
  title: {
    fontSize: typography.healthTitle,
    color: colors.title,
    fontWeight: "800",
    maxWidth: "100%",
  },
  subTitle: {
    fontSize: typography.healthInfo,
    color: colors.UiText,
    fontWeight: "500",
    marginTop: hp(0.5),
    maxWidth: "100%",
    lineHeight: 14,
    marginBottom: 13,
  },
  SvgCard: {
    position: "absolute",
    right: 0,
  },
});
