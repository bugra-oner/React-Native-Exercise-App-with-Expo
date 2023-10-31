import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Header from "../../components/views/Header";

import ArticleCard from "./ArticleCard";
import { articles } from "./ArticleData";

import { useTranslation } from "react-i18next";
import { hp, wp, fp } from "../../utils";

export default function Discover() {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const _renderFlatList = () => {
    if (language !== "tr" && language !== "en") {
      return (
        <FlatList
          style={styles.ArticleCard}
          data={articles["en"]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      );
    } else
      return (
        <FlatList
          style={styles.ArticleCard}
          data={articles[language]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      );
  };

  // console.log(language);
  const renderItem = ({ item }) => (
    <ArticleCard
      key={item.id}
      title={item.title}
      readTime={item.time}
      description={item.description}
      topic={item.topic}
      selectedLanguage={
        language !== "en" && language !== "tr" ? "en" : language
      }
    />
  );
  return (
    <View>
      <Header title={t("Discover")} />
      <Text style={styles.articleTitle}>{t("Articles")}</Text>
      {_renderFlatList()}
    </View>
  );
}

const styles = StyleSheet.create({
  articleTitle: {
    fontSize: fp(2.6),
    marginTop: hp(2),
    left: wp(5),
    color: "black",
    fontWeight: "800",
  },
  ArticleCard: {
    backgroundColor: "transparent",
    marginVertical: hp(2),
    alignSelf: "center",
  },
});
