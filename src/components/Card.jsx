import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Card = ({ title, icon, subtitle, contentText, bottomText1, bottomText2, bottomText3 }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#575ea8', '#83c29f']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.gradientContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.contentText}>{contentText}</Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>{bottomText1}</Text>
          <Text style={styles.bottomText}>{bottomText2}</Text>
          <Text style={styles.bottomText}>{bottomText3}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  gradientContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    padding: 15,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default Card;
