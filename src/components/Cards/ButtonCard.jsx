import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import typography from '../../constants/typography';
import colors from '../../constants/colors';

export default function ButtonCard({title,subTitle,onPress}) {
  return (
    <TouchableOpacity
    onPress={onPress} 
    style={styles.container}>
      
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
      
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180.65,
    height: '48%',
    backgroundColor: '#F3F5FF',
    borderRadius: 13,
    borderColor: 'black',
    shadowColor: '#000000', // Gölgenin rengini burada belirleyebilirsiniz
    shadowOpacity: 0.7, // Gölgenin opaklığını burada belirleyebilirsiniz
    shadowRadius: 6.604332447052002, // Gölgenin yuvarlaklık derecesini burada belirleyebilirsiniz
    shadowOffset: { width: 1.3208664655685425, height: 1.3208664655685425 }, // Gölgenin konumunu burada belirleyebilirsiniz
    elevation: 5, // Sadece Android için shadow (iOS bu prop'u kullanmaz)
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    marginVertical: 1,
    color: colors.UiText,
    fontWeight: 'bold',
    fontSize : typography.title
  },
  subTitle:{
    marginVertical: 1,
    color: colors.UiText,
    fontWeight : '700',
    fontSize: typography.cardSubtitle
  },
});
