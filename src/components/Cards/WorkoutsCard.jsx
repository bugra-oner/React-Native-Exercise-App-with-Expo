import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import typography from '../../constants/typography';
import colors from '../../constants/colors';
import Button from '../Button';

// Resimleri require ile içe aktarın
const pushUpsImage = require('../../assets/push_ups.png');
const sitUpsImage = require('../../assets/sit_ups.png');
const calfRaisesImage = require('../../assets/calf_raises.png');
const squatsImage = require('../../assets/squats.png');

export default function WorkoutsCard({ title, subTitle, onPress, image,buttonText }) {
  // Burada gelen 'image' prop'unu kullanarak hangi resmi kullanacağınıza karar vermelisiniz
  let selectedImage = pushUpsImage; // Örnek olarak push-ups resmi varsayılan olarak ayarlandı

  // Gelen 'image' prop'unun değerine göre doğru resmi seçme işlemi
  if (image === 'push_ups') {
    selectedImage = pushUpsImage;
  } else if (image === 'sit_ups') {
    selectedImage = sitUpsImage;
  } else if (image === 'calf_raises') {
    selectedImage = calfRaisesImage;
  } else if (image === 'squats') {
    selectedImage = squatsImage;
  }

  return (
    <View style={styles.card}>
      <Image source={selectedImage} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <Button
      title={buttonText}
      borderRadius={20}
      onPress={onPress}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 16,
    backgroundColor: '#F3F5FF',
    borderRadius: 25,
    borderColor: 'black',
    shadowColor: '#000000',
    shadowOpacity: 0.7,
    shadowRadius: 6.604332447052002,
    shadowOffset: { width: 1.3208664655685425, height: 1.3208664655685425 },
    elevation: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 20
  },
  title: {
    fontSize: typography.workoutsCardTitle,
    color: colors.UiText,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  subTitle: {
    color: colors.UiText,
    fontWeight: '700',
    fontSize: typography.workoutsCardSubtitle,
    opacity: 0.7,
  },
});
