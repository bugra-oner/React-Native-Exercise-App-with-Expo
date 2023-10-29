import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ArticleDetail({ route }) {
  const { article } = route.params; // Makale verilerini article adında bir nesneye al

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
  },
});
