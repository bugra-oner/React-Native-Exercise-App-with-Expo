import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FitnessItems } from "../../Context";

import { fp, hp, wp } from "../../utils";

import AsyncStorage from "@react-native-async-storage/async-storage";

import typography from "../../constants/typography";
import LinearView from "../../components/views/LinearView";
import { useTranslation } from "react-i18next";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const FitScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();
  //  console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;

  const totalExercises = route.params.timings[0];

  //Workout name route.params.name
  //console.log("params", route.params.name);
  //console.log("test", excersise);

  const current = excersise[index];

  const currentNext = excersise[index + 1];

  const currentPrev = excersise[index - 1];
  //{"id": "10", "image": 23, "name": "JUMPING JACKS", "sets": 12} first excersise

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);

  //console.log(completed, "completed excersise");

  // Her bir setin süresi ve kalori tüketimi ile ilgili verilere sahipseniz,
  // bu işlevi kullanarak antrenmanın toplam süresini ve yakılan kaloriyi hesaplayabilirsiniz.

  const handleWorkoutCompletion = async () => {
    // Antrenman tamamlandığında istatistikleri güncelle
    //console.log(
    //  minutes,
    //  "minute",
    //  calories,
    //  "calories",
    //  "workout",
    //  workout,
    //  "completed",
    //  completed
    //);

    // AsyncStorage kullanarak istatistikleri sakla
    // const fixedCalories = calories.toFixed(2);
    try {
      await AsyncStorage.setItem("workout", workout.toString());
      await AsyncStorage.setItem("calories", calories.toString());
      await AsyncStorage.setItem("minutes", minutes.toString());
      // BURADA ANTREMAN İSMİNE AIT DEĞERİ 1 artırmamız lazım
      // Antrenmanın adını alın
      const exerciseName = route.params.name;

      // Antrenmanın mevcut değerini alın veya 0 olarak ayarlayın
      const currentExerciseCount =
        (await AsyncStorage.getItem(exerciseName)) || "0";

      // Mevcut değeri 1 artırın ve yeni değeri saklayın
      const newExerciseCount = parseInt(currentExerciseCount) + 1;
      await AsyncStorage.setItem(exerciseName, newExerciseCount.toString());

      setCompleted("");

      // İstatistikler başarıyla saklandı
    } catch (error) {
      //console.error("Istatistikleri saklama hatası:", error);
    }

    navigation.navigate("CoachScreen", { workoutComplete: true });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearView
        colorsOne="#cbbee9d4"
        colorsTwo="#a7a7a7"
        startOne={0}
        startTwo={0}
        endOne={0}
        endTwo={1}
        style={{ flex: 1 }}
      >
        <View style={styles.gifView}>
          <Image style={styles.gif} source={current.image} />
        </View>
        <Text style={styles.workoutName}>{current.name}</Text>
        <Text
          style={{
            color: "black",
            fontSize: fp(2.7),
            textAlign: "center",
            marginTop: hp(2),
            opacity: 0.4,
          }}
        >
          {index + 1}.
          <Text style={{ fontSize: fp(1.7), position: "absolute" }}>
            ({totalExercises}){" "}
          </Text>{" "}
          {t("Exercise")}
        </Text>
        <Text style={styles.sets}>x{current.sets}</Text>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              handleWorkoutCompletion();
            }}
            style={styles.doneButton}
          >
            <Text style={styles.doneText}>{t("CompleteExc")}</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest", {
                index: index + 1,
                current: currentNext,
                length: excersise.length,
              });
              // console.log("Burası ilk rest");

              setCompleted([...completed, current.name]);
              setWorkout(workout + 1);
              setMinutes(minutes + 2.5);
              setCalories(calories + 6.3);
              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={styles.doneButton}
          >
            <Text style={styles.doneText}>{t("CompleteSet")}</Text>
          </Pressable>
        )}

        <Pressable style={styles.bottomButtonsView}>
          <Pressable
            disabled={index === 0}
            onPress={() => {
              navigation.navigate("Rest", {
                index: index + 1,
                current: currentPrev,
                length: excersise.length,
              });
              // console.log("Burası");
              setTimeout(() => {
                setIndex(index - 1);
              }, 2000);
            }}
            style={styles.prevButton}
          >
            <Text style={styles.prevText}>
              <MaterialCommunityIcons
                name="set-left-center"
                size={fp(3.2)}
                color={"#00000055"}
              />{" "}
              {t("Prev")}
            </Text>
          </Pressable>
          {index + 1 >= excersise.length ? (
            <Pressable
              onPress={() => {
                navigation.navigate("CoachScreen", {
                  index,
                  current: currentNext,
                  length: excersise.length,
                });
              }}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>
                <MaterialCommunityIcons
                  name="set-center-right"
                  size={fp(3.2)}
                  color={"black"}
                />{" "}
                {t("Skip")}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate("Rest", {
                  index: index + 1,
                  current: currentNext,
                  length: excersise.length,
                });
                setTimeout(() => {
                  setIndex(index + 1);
                }, 2000);
              }}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>
                <MaterialCommunityIcons
                  name="set-center-right"
                  size={fp(3.2)}
                  color={"#00000055"}
                />{" "}
                {t("Skip")}
              </Text>
            </Pressable>
          )}
        </Pressable>
      </LinearView>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({
  gifView: {
    alignSelf: "center",
    overflow: "hidden", // GIF içeriğini çerçevenin içine sığdırmak için
    width: wp(94),
    height: hp(42),
    borderRadius: 15,
    marginTop: hp(5),
    alignItems: "center",
  },
  gif: {
    width: wp(94),
    height: hp(42),
  },
  workoutName: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    fontSize: typography.workoutGifName,
    fontWeight: "bold",
  },
  sets: {
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: hp(3),
    fontSize: typography.workoutGifSets,
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "#0000ff53",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: hp(1),
    borderRadius: 20,
    padding: 10,
    width: 180,
  },
  doneText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  skipButton: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: wp(0),
    width: wp(50),
  },
  skipText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    fontSize: fp(4),
    color: "rgba(80,80,136,0.8)",
    opacity: 0.6,
  },
  prevButton: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: wp(0),
    width: wp(50),
  },
  prevText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fp(4),
    color: "rgba(80, 80, 136, 0.8)",
    opacity: 0.6,
  },
  bottomButtonsView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 0,
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
    bottom: hp(2),
  },
});
