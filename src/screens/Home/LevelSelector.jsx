import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../../navigation/navigationRef";
import ExerciseService from "../../service/ExerciseService";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/views/Header";

import { useTranslation } from "react-i18next";

import { hp, wp, fp } from "../../utils";

export default function LevelSelector() {
  const { t } = useTranslation();
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const navigation = useNavigation();

  const loadFromAsyncStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return Number(value);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const loadLevel = async () => {
    const getData = await AsyncStorage.getItem("@fullBodyWorkoutStatus");
    const currentLevel = JSON.parse(getData);

    //console.log(getData["HomeFullBodyWorkout"]); // Bu kullanım şekli işlemiyor
    //console.log(currentLevel["HomeFullBodyWorkout"]?.level || 1); // Çalışan bu

    setLevel(currentLevel["HomeFullBodyWorkout"]?.level || 1);
    const savedExerciseIndex = await loadFromAsyncStorage("@exerciseIndex");

    if (savedExerciseIndex !== undefined) {
      setExerciseIndex(savedExerciseIndex);
    }
  };

  const increaseLevel = async () => {
    Alert.alert(`${t("IncreaseLevel")}`, `${t("IncreaseLevelSub")}`, [
      {
        text: `${t("Cancel")}`,
        style: "cancel",
      },
      {
        text: `${t("IncreaseLevel")}`,
        onPress: async () => {
          try {
            await AsyncStorage.setItem("@level", String(level + 1));
            setLevel(level + 1);
          } catch (error) {
            // console.log(error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    loadLevel();
  }, [navigation]);

  const exercises = ExerciseService.getExercises();

  return (
    <>
      <Header
        LeftIconOnPress={() => navigation.goBack()}
        title={t("Overview")}
        RightIcon="abacus"
      />
      <View style={styles.container}>
        <Text style={styles.title}>{t('WorkoutContent')}</Text>
        <ScrollView style={styles.exercisesList}>
          {exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseText}>Sets: {exercise.sets}</Text>
              <Text style={styles.exerciseText}>
                Reps per set:{" "}
                {ExerciseService.increaseRepsByLevel(exercise, level).join(
                  ", "
                )}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button title={t("IncreaseLevel")} onPress={increaseLevel} />
          <Button
            title={t("StartWorkout")}
            onPress={() => navigate("Workout")}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: fp(3.4),
    fontWeight: "bold",
    marginBottom: hp(1.7),
    marginTop: hp(1.5),
  },
  exercisesList: {
    width: "100%",
    marginBottom: 20,
  },
  exerciseItem: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    backgroundColor: "#fff",
    elevation: 5, // Gölgelendirme ekledik
  },
  exerciseName: {
    fontSize: fp(2.9),
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: fp(2.2),
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
});
