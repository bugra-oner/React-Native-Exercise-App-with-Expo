import React, { useState, useEffect, useTransition } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from "@expo/vector-icons"; // Kalp ikonu için

import { useNavigation } from "@react-navigation/native";

import { hp, wp, fp } from "../../utils";

import { useTranslation } from "react-i18next";

export default function ArticleDetail({ route }) {
  const { article } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();

  const { t } = useTranslation();

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const likedArticles = await AsyncStorage.getItem("likedArticles");
        const likedArticlesArray = JSON.parse(likedArticles) || [];
        setIsLiked(likedArticlesArray.includes(article.title));
      } catch (error) {
        // console.error("Beğenme durumu kontrol hatası:", error);
      }
    };

    checkLikedStatus();
  }, [article.title]);

  const handleLike = async () => {
    try {
      const likedArticles = await AsyncStorage.getItem("likedArticles");
      const likedArticlesArray = JSON.parse(likedArticles) || [];

      if (isLiked) {
        const updatedLikedArticles = likedArticlesArray.filter(
          (articleTitle) => articleTitle !== article.title
        );
        await AsyncStorage.setItem(
          "likedArticles",
          JSON.stringify(updatedLikedArticles)
        );
      } else {
        likedArticlesArray.push(article.title);
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

  return (
    <ScrollView style={styles.container}>
      <Image source={article.Image} style={styles.image} />
      <MaterialCommunityIcons
        name={"arrow-left"}
        onPress={() => navigation.goBack()}
        size={fp(6)}
        style={styles.arrowIcon}
        color="white"
      />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.topic}>
        {t("Subject")} {article.topic}
      </Text>
      <Text style={styles.content}>{article.content}</Text>
      <Text style={styles.moreContent}>{article.moreContent}</Text>
      <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
        <MaterialCommunityIcons
          name={isLiked ? "heart" : "heart-outline"}
          size={fp(5)}
          color={isLiked ? "red" : "gray"}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    alignSelf: "center",
  },
  title: {
    fontSize: fp(3.4),
    fontWeight: "900",
    marginTop: fp(3),
    color: "#484F88",
  },
  topic: {
    fontSize: fp(2),
    color: "gray",
    marginVertical: hp(1.2),
  },
  content: {
    fontSize: fp(2),
    lineHeight: fp(3.7),
    fontWeight: "500",
  },
  moreContent: {
    marginVertical: hp(3),
    fontSize: fp(2),
    lineHeight: fp(3.2),
    marginBottom: hp(7),
  },
  likeButton: {
    position: "absolute",
    top: 20,
    right: 5,
  },
  arrowIcon: {
    position: "absolute",
    top: 20,
    left: 0,
  },
});
