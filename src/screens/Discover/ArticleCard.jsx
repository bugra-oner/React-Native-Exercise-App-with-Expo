import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { articles } from "./ArticleData";
import { useNavigation } from "@react-navigation/native";

import { fp, hp, wp } from "../../utils";

import { useTranslation } from "react-i18next";

export default function ArticleCard({
  title,
  description,
  readTime,
  topic,
  selectedLanguage,
  headerImage,
}) {
  const navigation = useNavigation();
  const [isSaved, setIsSaved] = useState(false); // Yeni eklenen kaydetme işlevi

  const article = articles[selectedLanguage].find(
    (article) => article.title === title
  );

  const { t } = useTranslation();

  useEffect(() => {
    // Makale beğenilmiş mi kontrol et
    // Makale kaydedilmiş mi kontrol et
    const checkSavedStatus = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem("savedArticles");
        const savedArticlesArray = JSON.parse(savedArticles) || [];
        setIsSaved(savedArticlesArray.includes(title));
      } catch (error) {
        // console.error("Kaydetme durumu kontrol hatası:", error);
      }
    };

    checkSavedStatus();
  }, [title]);

  const handleSave = async () => {
    try {
      // Makaleyi kaydetmiş kullanıcıların listesini alın
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      const savedArticlesArray = JSON.parse(savedArticles) || [];
      // console.log("Saved articles", savedArticlesArray);
      if (!savedArticlesArray.includes(title)) {
        // Eğer daha önce kaydedilmemişse, makaleyi kaydedilenlere ekle
        savedArticlesArray.push(title);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        setIsSaved(true); // Kaydedildi olarak işaretle
      } else {
        // Eğer zaten kaydedilmişse, kaydedilen makaleleri kaldır
        const updatedSavedArticles = savedArticlesArray.filter(
          (articleTitle) => articleTitle !== title
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticles)
        );
        setIsSaved(false); // Kaydedilmedi olarak işaretle
      }
    } catch (error) {
      // console.error("Kaydetme işlevselliği hatası:", error);
    }
  };

  const handleCardPress = () => {
    // Kullanıcı makale kartına tıkladığında, makalenin ayrı sayfasına yönlendirilir.
    if (article) {
      navigation.navigate("ArticleDetail", { article });
    }
  };
  return (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress()}>
      <Image source={headerImage} style={styles.image} />
      <MaterialCommunityIcons
        name={isSaved ? "bookmark" : "bookmark-outline"}
        size={24}
        color={isSaved ? "blue" : "gray"}
        onPress={handleSave}
        style={styles.bookmark}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.descriptionView}>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.metaContainer}>
        <View style={styles.readTimeContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={fp(2.4)}
            color="gray"
            style={styles.clockOutline}
          />
          <Text style={styles.readTimeText}>{readTime}</Text>
        </View>
        <View style={styles.topicContainer}>
          <MaterialCommunityIcons
            name="label-outline"
            size={fp(2.4)}
            color="gray"
            style={styles.labelOutline}
          />
          <Text style={styles.topicText}>{topic}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ede5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7.84,
    elevation: 5,
    marginHorizontal: wp(3),
    height: hp(27),
    width: wp(30),
    marginBottom: hp(2),
  },
  image: {
    width: wp(28),
    height: hp(10),
    borderRadius: 15,
    alignSelf: "center",
  },
  title: {
    fontSize: fp(1.6),
    fontWeight: "bold",
    color: "#484F88",
    maxHeight: hp(5),
  },
  descriptionView: {
    height: hp(7),
  },
  description: {
    fontSize: fp(1.3),
    color: "black",
    fontWeight: "bold",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: hp(1),
  },
  readTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTimeText: {
    marginLeft: wp(1),
    fontSize: fp(1.7),
    color: "gray",
    fontWeight: "600",
  },
  topicContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: wp(6.5),
  },
  topicText: {
    marginLeft: wp(0.7),
    fontSize: fp(1.5),
    color: "gray",
    fontWeight: "600",
  },
  bookmark: {
    position: "absolute",
    top: 15,
    right: 10,
  },
  clockOutline: {
    marginLeft: wp(1),
  },
  labelOutline: {
    marginLeft: wp(1),
  },
});
