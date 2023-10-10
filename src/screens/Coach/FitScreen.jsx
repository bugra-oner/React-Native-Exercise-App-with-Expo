import { StyleSheet, Text, SafeAreaView, Image, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FitnessItems } from "../../Context";

import { fp, hp, wp } from "../../utils";

import AsyncStorage from "@react-native-async-storage/async-storage";

import typography from "../../constants/typography";

const FitScreen = () => {
  const route = useRoute();
  //  console.log(route.params);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;

  //Workout name route.params.name
  console.log("params", route.params.name);
  console.log("test", excersise);
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
    console.log(
      minutes,
      "minute",
      calories,
      "calories",
      "workout",
      workout,
      "completed",
      completed
    );

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
    <SafeAreaView>
      <Image style={styles.gif} source={current.image} />
      <Text style={styles.workoutName}>{current.name}</Text>
      <Text style={styles.sets}>x{current.sets}</Text>
      {index + 1 >= excersise.length ? (
        <Pressable
          onPress={() => {
            handleWorkoutCompletion();
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
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
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      )}

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Pressable
          disabled={index === 0}
          onPress={() => {
            navigation.navigate("Rest");
            setTimeout(() => {
              setIndex(index - 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 20,
            marginHorizontal: 20,
            width: 100,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            PREV
          </Text>
        </Pressable>
        {index + 1 >= excersise.length ? (
          <Pressable
            onPress={() => {
              navigation.navigate("CoachScreen");
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate("Rest");
              setTimeout(() => {
                setIndex(index + 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SKIP
            </Text>
          </Pressable>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({
  gif: {
    width: wp(100),
    height: hp(40),
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
});
