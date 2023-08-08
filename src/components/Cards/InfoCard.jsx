import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';

const InfoCard = ({ title, description, imageSource }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%', // Kartları yatayda yan yana sığdırmak için genişlik ayarı
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5, // Kartlar arasındaki boşluk
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 80, // Görsel boyutunu istediğiniz gibi ayarlayabilirsiniz
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: typography.InfoTitle,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.title,
  },
  description: {
    fontSize: typography.InfoText,
    color: colors.bodyText,
  },
});

export default InfoCard;
