import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import fitness from "../../data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FitnessCards = ({ difficulty, backgroundColor, first, stars }) => {
  const FitnessData = fitness;
  const navigation = useNavigation();
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
              height: 130,
              borderRadius: 10,
              opacity: 0.8,
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
              fontSize: 17,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
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

          <MaterialCommunityIcons
            name="star"
            size={22}
            color="#ffffff"
            style={{ position: "absolute", bottom: 15, right: 17 }}
          />
          <MaterialCommunityIcons
            name="star"
            size={22}
            color="#ffffff"
            style={{ position: "absolute", bottom: 15, right: 47 }}
          />
          <MaterialCommunityIcons
            name="star"
            size={22}
            color="#ffffff"
            style={{ position: "absolute", bottom: 15, right: 77 }}
          />
          <MaterialCommunityIcons
            name="star"
            size={22}
            color="#ffffff"
            style={{ position: "absolute", bottom: 15, right: 107 }}
          />
          <MaterialCommunityIcons
            name="star"
            size={22}
            color="#ffffff"
            style={{ position: "absolute", bottom: 15, right: 137 }}
          />
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
