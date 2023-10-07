import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Platform } from "react-native";

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
      console.log("Fetch");
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
          <View style={styles.TextView}>
            <Text
              style={{
                // position: "absolute",
                color: "white",
                fontSize: 17,
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
                fontSize: 14,
                fontWeight: "bold",
                // left: key === 0 ? 63 : 40,
                // top: 45,
                // textAlign: "center",
              }}
            >
              {item.timing[0]} Egzersiz {item.timing[1]} Dakika
            </Text>
          </View>
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 0 ? "#ffffff" : "black",
              bottom: 15,
              left: 20,
              opacity: difficulty === 0 ? 0.5 : 1,
            }}
            name="lightning-bolt"
            size={24}
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 2 ? "#ffffff" : "black",
              bottom: 15,
              left: 40,
              opacity: difficulty === 2 ? 0.4 : 1,
            }}
            name="lightning-bolt"
            size={24}
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 3 ? "white" : "black",
              bottom: 15,
              left: 60,
              opacity: difficulty === 3 ? 0.4 : 1,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: difficulty >= 5 ? "white" : "black",
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
              color: difficulty >= 5 ? "white" : "black",
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
              /*
              ! 1. Star index = 0 ,  2. Star index = 1,  3.Star = 2,  4.Star index = 4, 5.Star index = 5 
              ! exerciseCounts[ExerciseName] >= starIndex'ten büyük ise  Beyaz yap değil ise siyah yap.

              * 1[FullBodyWorkout] => 0(1.Yıldız) Beyaz geri kalan yıldızlar siyah yani antreman 
              * bir kere tamamlandı.  - Burası okey

              * Antreman hiç yapılmamışsa 5 siyah yıldız var , 1 kere antreman yapılınca, 
              * 1.beyaz oluyor kalan 4 siyah oluyor  - Burası da okey

              ?  Yukarıdaki işlemler çalışıyor,
              ?  Amaç 3 kere antreman yapıldıysa 1. yıldız beyaz 2.gri(opacity verilerek),
              ?  4.antreman yapıldığında 2 yıldız da beyaz, kalan 3 yıldız siyah
              ?  Burada amaç 5x1 = antreman yaptırmak yerine 5x2= 10 antreman yaptırmak 

              *  (exerciseCounts[item.name]) = 4[FullBodyWorkout], [1, 2, 3, 4, 5].map((starIndex) =>
              *   4 kere  FullBody > 1. Yıldız beyaz 2.Yıldız beyaz geri kalan 3 yıldız siyah
              *   3 kere Squad > 1.Yıldız beyaz 2.yıldız gri saydam kalanlar siyah 
              *   6 kere > 3. yıldız dahil beyaz kalanlar siyah 

              
                
              */
              opacity={
                parseInt(exerciseCounts[item.name]) >= starIndex * 2 ? 0 : 1
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
  TextView: {
    position: "absolute",
    left: 23,
    top: 20,
  },
});
