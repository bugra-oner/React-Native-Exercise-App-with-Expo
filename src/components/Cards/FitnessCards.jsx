import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import fitness from "../../data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FitnessCards = () => {
  const FitnessData = fitness;
  const navigation = useNavigation();
  return (
    <View>
      {FitnessData.map((item, key) => (
        <Pressable
        onPress={() => navigation.navigate("WorkoutScreen",{
          image:item.image,
          excersises:item.excersises,
          id:item.id,
        })}
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image
            style={{ width: "95%", height: 140, borderRadius: 7,backgroundColor: 'red' }}
            source={item.image}
          />
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
            style={{ position: "absolute", color: "#ffffff", bottom: 15,left:20 }}
            name="lightning-bolt"
            size={23}
            color="black"
          />
          <MaterialCommunityIcons
            style={{ position: "absolute", color: "#ffffff", bottom: 15,left:40 }}
            name="lightning-bolt"
            size={23}
            color="black"
          />
          <MaterialCommunityIcons
            style={{ position: "absolute", color: "#ffffff", bottom: 15,left:60 }}
            name="lightning-bolt"
            size={23}
            color="black"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});