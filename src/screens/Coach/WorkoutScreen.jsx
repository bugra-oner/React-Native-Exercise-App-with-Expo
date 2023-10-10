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

  //console.log(route.params);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", marginTop: 0 }}
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
          colorsOne="#d7d7ec"
          colorsTwo="#ffff"
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

          {route.params.excersises.map((item, index) => (
            <Pressable style={styles.workoutView} key={index}>
              <Image
                style={{
                  width: 90,
                  height: 90,
                  opacity: 0.8,
                }}
                source={item.image}
              />
              <View style={{ marginLeft: 15 }}>
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
              <View style={styles.border} />
            </Pressable>
          ))}
        </LinearView>
      </ScrollView>

      <Pressable
        onPress={() => {
          navigation.navigate("Fit", {
            excersises: route.params.excersises,
            name: route.params.name,
          });
          setCompleted([]);
        }}
        style={{
          backgroundColor: "#59c02a",
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
            color: "white",
            fontSize: 15,
            fontWeight: "600",
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
  },
  workoutView: {
    margin: hp(3),
    flexDirection: "row",
    alignItems: "center",
  },
  itemNameText: {
    fontSize: 17,
    fontWeight: "bold",
    width: wp(55),
  },
  border: {
    width: wp(90),
    position: "absolute",
    borderBottomWidth: 0.6,
    opacity: 0.3,
    bottom: -7,
  },
});
