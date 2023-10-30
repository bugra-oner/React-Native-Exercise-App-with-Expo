import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";

export default function ArticleDetail({ route }) {
  const { article } = route.params; // Makale verilerini article adında bir nesneye al

    const [isLiked, setIsLiked] = useState(false);
  
    useEffect(() => {
      // Kullanıcının bu makaleyi beğenip beğenmediğini kontrol etmek için AsyncStorage'yi kullanın
      const checkLikedStatus = async () => {
        try {
          const likedArticles = await AsyncStorage.getItem("likedArticles");
          const likedArticlesArray = JSON.parse(likedArticles) || [];
          setIsLiked(likedArticlesArray.includes(article.title));
        } catch (error) {
          console.error("Beğenme durumu kontrol hatası:", error);
        }
      };
  
      checkLikedStatus();
    }, [article.title]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.author}>Yazar: {article.author}</Text>
      <Text style={styles.date}>Yayın Tarihi: {article.date}</Text>
      <Text style={styles.content}>{article.content}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  author: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
