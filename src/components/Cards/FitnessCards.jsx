import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import fitness from "../../data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
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
            })
          }
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image
            style={{
              width: "96%",
              height: 150,
              borderRadius: 10,
              opacity: 0.7,
            }}
            source={item.image}
          />
          {/* Önerilen etiketi */}
          {key === 0 && first === true && (
            <View style={styles.recommendedTag}>
              <Text style={styles.recommendedTagText}>
                Başlangıç için ideal
              </Text>
            </View>
          )}
          {/* Diğer içerikler */}
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              left: 21,
              top: 22,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 11,
              fontWeight: "bold",
              left: key === 0 ? 63 : 32,
              top: 45,
            }}
          >
            20 Egzersiz 10dk
          </Text>

          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: "#ffffff",
              bottom: 15,
              left: 20,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 1 ? "white" : "black",
              bottom: 15,
              left: 40,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 2 ? "white" : "black",
              bottom: 15,
              left: 60,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 3 ? "white" : "black",
              bottom: 15,
              left: 80,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 4 ? "white" : "black",
              bottom: 15,
              left: 100,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />

          {/* Kart içeriği */}
          {/* Yıldızları belirleme */}
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <MaterialCommunityIcons
              key={starIndex}
              name="star"
              size={22}
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
  },
  recommendedTag: {
    position: "absolute",
    top: 30,
    right: -49,
    backgroundColor: "green", // Etiket arka plan rengi
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 100,
    transform: [{ rotate: "45deg" }],
    width: 170,
  },
  recommendedTagText: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
});
