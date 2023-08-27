import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import LottieView from 'lottie-react-native';

import colors from '../constants/colors';
import typography from '../constants/typography';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    if (weight && height && age) {
      const heightInMeters = height / 100; // Boyu metreye çevir
      const calculatedBMI = weight / (heightInMeters * heightInMeters);

      let interpretation = '';
      if (calculatedBMI < 16) {
        interpretation = 'Çok zayıf';
      } else if (calculatedBMI < 17) {
        interpretation = 'Zayıf';
      } else if (calculatedBMI < 18.5) {
        interpretation = 'Hafif zayıf';
      } else if (calculatedBMI < 24.9) {
        interpretation = 'Normal';
      } else if (calculatedBMI < 29.9) {
        interpretation = 'Hafif kilolu';
      } else if (calculatedBMI < 34.9) {
        interpretation = 'Kilolu';
      } else if (calculatedBMI < 39.9) {
        interpretation = 'Şişman';
      } else {
        interpretation = 'Obez';
      }

      setBMI({
        value: calculatedBMI.toFixed(2),
        interpretation: interpretation,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vücut Kitle İndeksi Hesaplama</Text>
      <TextInput
        style={styles.input}
        placeholder="Kilonuzu girin (kg)"
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Boyunuzu girin (cm)"
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Yaşınızı girin"
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
      <Button title="Hesapla" onPress={calculateBMI} />
      {bmi !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Vücut Kitle İndeksi: {bmi.value}</Text>
          <Text style={styles.resultText}>Durum: {bmi.interpretation}</Text>
        </View>
      )}
      <Text style={styles.infoText}>
        Bu yorumlar Dünya Sağlık Örgütü tarafından belirlenen kategorilere dayanmaktadır.
      </Text>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150,
          marginTop: 25,
        }}
        source={require('../animations/data.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.UiText,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    maxWidth: '90%'
  },
});

export default BMICalculator;





