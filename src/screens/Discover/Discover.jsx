import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useTransition } from "react";

import Header from "../../components/views/Header";

import ArticleCard from "./ArticleCard";
import { articles } from "./ArticleData";

import { useTranslation } from "react-i18next";
import { hp, wp, fp } from "../../utils";

export default function Discover() {
  const { t } = useTranslation();
  const renderItem = ({ item }) => (
    <ArticleCard key={item.id} title={item.title} />
  );
  return (
    <View>
      <Header title={t("Discover")} />
      <Text style={styles.articleTitle}>{t("Articles")}</Text>
      <FlatList
        style={styles.ArticleCard}
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  articleTitle: {
    fontSize: fp(2.6),
    marginTop: hp(2),
    left: wp(5),
    color: "rgba(80,80,136)",
  },
  ArticleCard: {
    backgroundColor: "transparent",
    marginVertical: hp(2),
    width: wp(96),
    alignSelf: "center",
  },
});
