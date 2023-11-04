import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useTranslation } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { fp, hp, wp } from "../../utils";
//Burada async storagedeki egzersizi getireceğiz fakat  maplarken verip kontrol etmemiz gerekiyor aslında sırayla getireceğiz gibi
// Böyle bir şey mümkün mü bilmiyorum

const FitnessCards = ({
  difficulty,
  backgroundColor,
  first,
  stars,
  data,
  workoutCompleted,
}) => {
  const FitnessData = data;
  const navigation = useNavigation();
  const [exerciseCounts, setExerciseCounts] = useState({});

  useEffect(() => {
    // Fitness kartları oluşturulduğunda, her antrenmanın yapılma sayısını alın
    const fetchExerciseCounts = async () => {
      //console.log("Fetch");
      const counts = {};
      for (const item of FitnessData) {
        const exerciseName = item.name;
        const currentExerciseCount =
          (await AsyncStorage.getItem(exerciseName)) || "0";
        counts[exerciseName] = currentExerciseCount;
      }
      setExerciseCounts(counts);
    };

    fetchExerciseCounts();
  }, [FitnessData, workoutCompleted]);

  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {FitnessData.map((item, key) => (
        <Pressable
          onPress={() =>
            navigation.navigate("WorkoutScreen", {
              image: item.image,
              excersises: item.excersises,
              id: item.id,
              name: item.name,
              timing: item.timing,
              desc: item.description,
            })
          }
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image
            style={{
              width: "98%",
              height: hp(19),
              borderRadius: 10,
              opacity: 0.8,
              resizeMode: "stretch",
            }}
            source={item.image}
          />
          {/* Önerilen etiketi */}
          {key === 0 && first === true && (
            <View style={styles.recommendedTag}>
              <Text style={styles.recommendedTagText}>
                {t("StartingIdeal")}
              </Text>
            </View>
          )}
          {/* Diğer içerikler */}
          <View style={styles.TextView}>
            <Text
              style={{
                // position: "absolute",
                color: "white",
                fontSize: fp(2.1),
                fontWeight: "bold",
                // left: 21,
                // top: 22,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                // position: "absolute",
                color: "#ffffff",
                fontSize: fp(1.8),
                fontWeight: "bold",
                // left: key === 0 ? 63 : 40,
                // top: 45,
                // textAlign: "center",
              }}
            >
              {item.timing[0]} {t("Exercise")} {item.timing[1]} {t("Minute")}
            </Text>
          </View>
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 0 ? "#ffffff" : "black",
              bottom: 15,
              left: 20,
              opacity: difficulty === 0 ? 0.6 : 1,
            }}
            name="lightning-bolt"
            size={fp(2.6)}
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 2 ? "#ffffff" : "black",
              bottom: 15,
              left: 40,
              opacity: difficulty === 2 ? 0.6 : 1,
            }}
            name="lightning-bolt"
            size={fp(2.6)}
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 3 ? "white" : "black",
              bottom: 15,
              left: 60,
              opacity: difficulty === 3 ? 0.5 : 1,
            }}
            name="lightning-bolt"
            size={fp(2.6)}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 4 ? "white" : "black",
              bottom: 15,
              left: 80,
            }}
            name="lightning-bolt"
            size={fp(2.6)}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 5 ? "white" : "black",
              bottom: 15,
              left: 100,
            }}
            name="lightning-bolt"
            size={fp(2.6)}
            color="black"
          />

          {/* Kart içeriği */}
          {/* Yıldızları belirleme */}
          {/* <Text>{exerciseCounts[item.name]}</Text> */}
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <MaterialCommunityIcons
              key={starIndex}
              name="star"
              size={fp(2.6)}
              color={
                parseInt(exerciseCounts[item.name]) >= starIndex
                  ? "#ffffff"
                  : "#000000"
              }
              style={{
                position: "absolute",
                bottom: 15,
                right: 170 - 30 * starIndex,
              }}
            />
          ))}
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 5,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  recommendedTag: {
    position: "absolute",
    top: hp(3),
    left: wp(62),
    backgroundColor: "green", // Etiket arka plan rengi
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 100,
    transform: [{ rotate: "40deg" }],
  },
  recommendedTagText: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
    fontSize: fp(1.5),
  },
  TextView: {
    position: "absolute",
    left: 23,
    top: 20,
  },
});
