import { StyleSheet, Text, SafeAreaView, Image, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FitnessItems } from "../../Context";

import { fp, hp, wp } from "../../utils";

import AsyncStorage from "@react-native-async-storage/async-storage";

import typography from "../../constants/typography";
import LinearView from "../../components/views/LinearView";
import { useTranslation } from "react-i18next";

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

      // İstatistikler başarıyla saklandı
    } catch (error) {
      //console.error("Istatistikleri saklama hatası:", error);
    }

    navigation.navigate("CoachScreen", { workoutComplete: true });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.gif} source={current.image} />
      <LinearView
        colorsOne="#cbbee9d4"
        colorsTwo="#a7a7a7"
        startOne={0}
        startTwo={0}
        endOne={0}
        endTwo={1}
        style={{ flex: 1 }}
      >
        <Text style={styles.workoutName}>{current.name}</Text>
        <Text style={{ color: "black", fontSize: fp(3), textAlign: "center" }}>
          {index + 1}. {t("Exercise")} {totalExercises}{" "}
        </Text>
        <Text style={styles.sets}>x{current.sets}</Text>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              handleWorkoutCompletion();
            }}
            style={styles.doneButton}
          >
            <Text style={styles.doneText}>DONE</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest");
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
            <Text style={styles.doneText}>DONE</Text>
          </Pressable>
        )}

        <Pressable style={styles.bottomButtonsView}>
          <Pressable
            disabled={index === 0}
            onPress={() => {
              navigation.navigate("Rest");
              setTimeout(() => {
                setIndex(index - 1);
              }, 2000);
            }}
            style={styles.prevButton}
          >
            <Text style={styles.prevText}>PREV</Text>
          </Pressable>
          {index + 1 >= excersise.length ? (
            <Pressable
              onPress={() => {
                navigation.navigate("CoachScreen");
              }}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>SKIP</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate("Rest");
                setTimeout(() => {
                  setIndex(index + 1);
                }, 2000);
              }}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>SKIP</Text>
            </Pressable>
          )}
        </Pressable>
      </LinearView>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({
  gif: {
    width: wp(100),
    height: hp(46),
  },
  workoutName: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    fontSize: typography.workoutGifName,
    fontWeight: "bold",
  },
  sets: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    fontSize: typography.workoutGifSets,
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "blue",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    width: 150,
  },
  doneText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  skipButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    width: 100,
  },
  skipText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  prevButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    width: 100,
  },
  prevText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomButtonsView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "red",
  },
});
