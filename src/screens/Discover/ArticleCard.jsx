import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { articles } from "./ArticleData";
import { hp, wp, fp } from "../../utils";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ArticleCard({
  title,
  image,
  description,
  readTime,
  content,
  topic, // Konu etiketi
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      console.log("isLiked");
      // Makaleyi beğenmiş kullanıcıların listesini alın
      const likedArticles = await AsyncStorage.getItem("likedArticles");
      const likedArticlesArray = JSON.parse(likedArticles) || [];

      if (isLiked) {
        // Eğer beğeniyorsa, beğenilen makaleleri kaldır
        const updatedLikedArticles = likedArticlesArray.filter(
          (articleTitle) => articleTitle !== title
        );
        await AsyncStorage.setItem(
          "likedArticles",
          JSON.stringify(updatedLikedArticles)
        );
      } else {
        // Eğer beğenmiyorsa, makaleyi beğenilenlere ekle
        likedArticlesArray.push(title);
        await AsyncStorage.setItem(
          "likedArticles",
          JSON.stringify(likedArticlesArray)
        );
      }

      setIsLiked(!isLiked);
    } catch (error) {
      // console.error("Beğenme işlevselliği hatası:", error);
    }
  };
  const navigation = useNavigation();
  const article = articles.find((article) => article.title === title);

  const handleCardPress = () => {
    if (article) {
      navigation.navigate("ArticleDetail", { article });
    }
  };

  if (!article) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.metaContainer}>
        <View style={styles.readTimeContainer}>
          <MaterialCommunityIcons name="clock-outline" size={20} color="gray" />
          <Text style={styles.readTimeText}>{readTime}</Text>
        </View>
        <View style={styles.topicContainer}>
          <MaterialCommunityIcons name="label-outline" size={20} color="gray" />
          <Text style={styles.topicText}>{topic}</Text>
        </View>
        <MaterialCommunityIcons
          name={isLiked ? "heart" : "heart-outline"}
          size={20}
          color={isLiked ? "red" : "gray"}
          onPress={handleLike}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: wp(2),
    padding: 5,
  },
  image: {
    width: wp(5),
    height: hp(10),
    borderRadius: 10,
  },
  title: {
    fontSize: fp(2),
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTimeText: {
    marginLeft: 5,
    fontSize: 16,
    color: "gray",
  },
  topicContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topicText: {
    marginLeft: 5,
    fontSize: 16,
    color: "gray",
  },
});
