import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import typography from '../constants/typography';
import colors from '../constants/colors';


export default function SingleWorkoutCard({ title, description, imageSource, onPress,level }) {
 const hasLevel = typeof  level !== "undefined" ;
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Image source={imageSource} style={styles.image} />
      </View>
      {hasLevel && (
        <View style={styles.levelContainer}>
          <Text style={styles.level}>{level}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180.65,
    padding: 25,
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: colors.UiText,
    fontWeight: 'bold',
    fontSize: typography.workoutTitle,
  },
  description: {
    color: colors.UiText,
    fontWeight: '700',
    fontSize: typography.workoutSubtitle,
    marginTop: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain'
  },
  withLevel: {
    backgroundColor: 'lightblue', // level prop'u varsa arka plan rengini değiştir
  },
});
