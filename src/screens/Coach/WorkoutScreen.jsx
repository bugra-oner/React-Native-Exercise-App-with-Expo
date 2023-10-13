import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../../Context";
import { AntDesign } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import LinearView from "../../components/views/LinearView";

import { hp, fp, wp } from "../../utils";

const WorkOutScreen = () => {
  const route = useRoute();
  //   console.log(route.params);
  const navigation = useNavigation();
  const { completed, setCompleted } = useContext(FitnessItems);

  const { t } = useTranslation();
  console.log(route.params);
  let name = route.params.desc;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "black", marginTop: 0 }}
      >
        <Image
          style={{ width: "100%", height: 170 }}
          source={route.params.image}
        />

        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 20, left: 20 }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />
        <LinearView
          colorsOne="#ded0ff"
          colorsTwo="#ffff"
          startOne={0}
          startTwo={0}
          endOne={0}
          endTwo={1}
          style={styles.LinearView}
        >
          {/* Top Text View */}
          <View style={styles.timing}>
            <Text style={styles.timingText}>
              {route.params.timing[0]} {t("Exercise")}{" "}
              <Ionicons name="aperture" size={13} color="white" />{" "}
              {route.params.timing[1]} {t("Minute")}
            </Text>
          </View>
          {/* Top Text View */}
          <View style={styles.BalloonsView}>
            <View style={styles.balloon}>
              <Text style={styles.balloonText}>{name}</Text>
            </View>
            <View style={styles.balloon}>
              <Text style={styles.balloonText}>
                <Ionicons
                  style={{ marginRight: 5 }}
                  name="alarm"
                  color="#7d2ac0"
                />{" "}
                {route.params.timing[0]} {t("Exercise")}
              </Text>
            </View>
            <View style={styles.balloon}>
              <Text style={styles.balloonText}>
                <Ionicons name="play-circle" color="#7d2ac0" />{" "}
                {route.params.timing[1]} {t("Minute")}
              </Text>
            </View>
          </View>
          <View style={styles.border} />
          <Text style={styles.workoutTitle}>{t("WorkoutActivity")}</Text>
          {route.params.excersises.map((item, index) => (
            <Pressable style={styles.workoutView} key={index}>
              <Image style={styles.workoutImage} source={item.image} />

              <View style={{ marginLeft: wp(4) }}>
                <Text style={styles.itemNameText}>{item.name}</Text>
                <Text style={{ marginTop: 5, fontSize: 18, color: "gray" }}>
                  x{item.sets}
                </Text>
              </View>
              {completed.includes(item.name) ? (
                <AntDesign
                  style={{ marginLeft: wp(2) }}
                  name="checkcircle"
                  size={fp(4)}
                  color="green"
                />
              ) : null}
            </Pressable>
          ))}
        </LinearView>
      </ScrollView>

      <Pressable
        onPress={() => {
          navigation.navigate("Fit", {
            excersises: route.params.excersises,
            name: route.params.name,
            timings: route.params.timing,
          });
          setCompleted([]);
        }}
        style={{
          backgroundColor: "#7d2ac0",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
          width: 120,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#e70000",
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          {t("Start")}
        </Text>
      </Pressable>
    </>
  );
};

export default WorkOutScreen;

const styles = StyleSheet.create({
  LinearView: {},
  TopText: {},
  timing: {
    backgroundColor: "rgba(80,80,136,0.8)",
  },
  timingText: {
    fontSize: fp(2),
    color: "white",
    padding: 4,
    paddingLeft: 12,
    fontWeight: "bold",
  },
  workoutView: {
    marginHorizontal: hp(2),
    height: hp(17),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F5FF",
    borderRadius: 30,
    borderColor: "black",
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowRadius: 6.604332447052002,
    shadowOffset: { width: 1.3208664655685425, height: 1.3208664655685425 },
    elevation: 5,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: hp(2),
    // borderWidth: 1,
    // borderColor: "black",
  },
  BalloonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(2),
    marginTop: 15,
  },
  balloonText: {
    fontSize: fp(1.7),
    color: "#7d2ac0",
    fontWeight: "bold",
  },
  balloon: {
    width: wp(30),
    height: hp(5.2),
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(80,80,136,0.8)",
  },
  itemNameText: {
    fontSize: 17,
    fontWeight: "bold",
    width: wp(55),
  },
  border: {
    width: wp(90),
    alignSelf: "center",
    borderBottomWidth: 1,
    opacity: 0.4,
    marginTop: hp(2),
  },
  workoutImage: {
    width: wp(26),
    height: hp(14),
    opacity: 0.8,
  },
  workoutTitle: {
    fontSize: fp(2.5),
    color: "black",
    marginHorizontal: wp(5),
    marginTop: hp(2.2),
    fontWeight: "bold",
  },
});
