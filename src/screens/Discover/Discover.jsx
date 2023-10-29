import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Header from "../../components/views/Header";

import ArticleCard from "./ArticleCard";
import { articles } from "./ArticleData";

export default function Discover() {
  return (
    <View>
      <Header title={"Keşfet"} />
      {articles.map((article) => (
        <ArticleCard key={article.id} title={article.title} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
