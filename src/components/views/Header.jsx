import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";

import CustomIcon from "../CustomIcon";
import { hp, wp, fp } from "../../utils";

export default function Header({
  LeftIconOnPress,
  title,
  RightIconOnPress,
  LeftIcon = "chevron-left",
  RightIcon = "account-circle",
  LeftIconSize = hp(2.9),
  RightIconSize = hp(2.9),
  RightIconColor = "#fff",
  DefaultColor = "rgba(80,80,136,0.8)",
  borderBottomLeftRadius = 17,
  borderBottomRightRadius = 17,
}) {
  return (
    <View style={styles.outBackground}>
      <StatusBar backgroundColor={DefaultColor} barStyle="light-content" />
      <View
        style={[
          styles.header,
          {
            backgroundColor: DefaultColor,
            borderBottomLeftRadius: borderBottomLeftRadius,
            borderBottomRightRadius,
          },
        ]}
      >
        <TouchableOpacity onPress={LeftIconOnPress}>
          <CustomIcon name={LeftIcon} size={LeftIconSize} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>

        <TouchableOpacity onPress={RightIconOnPress}>
          <CustomIcon
            name={RightIcon}
            size={RightIconSize}
            color={RightIconColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS == "ios" ? hp(11) : hp(7.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: wp(5),
    paddingTop: Platform.OS == "ios" ? hp(4) : hp(0),
  },
  headerText: {
    color: "#ffff",
    fontSize: fp(2.7),
  },
});
