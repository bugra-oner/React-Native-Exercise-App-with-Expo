import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import GradientInput from '../inputs/GradientInput';
import GradientButton from '../buttons/GradientButton';

import AsyncStorage from '@react-native-async-storage/async-storage';
import typography from '../../constants/typography';
import { useTranslation } from 'react-i18next';

const ProteinCard = () => {
  const { t } = useTranslation();

  const [weight, setWeight] = useState('');
  const [proteinAmount, setProteinAmount] = useState(0);

  useEffect(() => {
    if (proteinAmount > 0) {
      saveProteinAmountToStorage(proteinAmount);
    }
  }, [proteinAmount]);

  const saveProteinAmountToStorage = async (proteinAmount) => {
    try {
      await AsyncStorage.setItem('proteinAmount', proteinAmount.toString());
      console.log('Protein amount saved to AsyncStorage:', proteinAmount);
    } catch (error) {
      console.log('Error saving protein amount to AsyncStorage:', error);
    }
  };

  const calculateProteinAmount = () => {
    if (weight) {
      const proteinCoefficient = 1.6; // Örnek protein katsayısı
      const protein = parseFloat(weight) * proteinCoefficient;
      setProteinAmount(protein.toFixed(2));
    }
  };

  return (
    <LinearGradient
      colors={['#5d432c', '#a87a59']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.cardContainer}
    >
    
      <Image source={require('../../assets//cards/protein-image.jpg')} style={styles.image} />
      
      <View style={styles.cardContent}>
        <Text style={styles.title}>{t('ProteinCalculator')}</Text>
        <GradientInput
          style={styles.input}
          placeholder={t('InputKg')}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
          colors={['#5d432c', '#8d7f76']} // Kahverengi tonları
        />
        <GradientButton
          title={t('CalculateProtein')}
          onPress={calculateProteinAmount}
          colors={['#8d684e', '#5d432c']} // Kahverengi tonları
        />
        {proteinAmount !== null && (
          <Text style={styles.resultText}>
            {t('DailyProteinAmount')}: {proteinAmount} {t('Gram')}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    width: 360, // Kartın genişliği
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 65,
    alignSelf: 'center',
    alignContent: "center",
    marginLeft: "3%"
  },
  cardContent: {
    flex: 1,
    padding: 10, // İçeriği daha sıkı hale getirin
    justifyContent: 'space-between', // İçeriği üstten alta sırala
  },
  title: {
    fontSize: typography.healthTitle,
    marginBottom: 5,
    color: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#fff', // Placeholder rengi
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    color: '#fff',
  },
  resultText: {
    fontSize: typography.healthText,
    marginTop: 5,
    color: '#fff',
  },
});

export default ProteinCard;
