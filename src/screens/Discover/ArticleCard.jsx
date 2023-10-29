import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // react-navigation kullanılıyor

import { articles } from "./ArticleData"; // Makale verilerini içe aktarıyoruz

import { hp, wp, fp } from "../../utils";

export default function ArticleCard({
  title,
  image,
  description,
  author,
  content,
}) {
  const navigation = useNavigation();

  const article = articles.find((article) => article.title === title);

  const handleCardPress = () => {
    // Kullanıcı makale kartına tıkladığında, makalenin ayrı sayfasına yönlendirilir.
    if (article) {
      navigation.navigate("ArticleDetail", { article });
    }
  };

  if (!article) {
    // Eğer makale bulunamazsa, boş bir bileşen döndürebilirsiniz veya bir hata mesajı gösterebilirsiniz.
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.author}>{author}</Text>
      {/* Paylaşma ve favori ekleme düğmeleri buraya eklenir */}
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
    margin: 10,
    padding: 5,
  },
  image: {
    width: wp(5),
    height: hp(10),
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  author: {
    fontSize: 12,
    color: "gray",
  },
});
