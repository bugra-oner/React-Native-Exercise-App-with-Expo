import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import CustomPicker from '../components/CustomPicker';

import typography from '../constants/typography';

const HealthCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [bmi, setBMI] = useState(null);
  const [dailyCalories, setDailyCalories] = useState(null);
  const [dailyWater, setDailyWater] = useState(null);
  const [idealWeight, setIdealWeight] = useState(null);

  const isFormValid = () => {
    return weight !== '' && height !== '' && age !== '' && gender !== '' && activityLevel !== '';
  }

  const calculateIdealWeight = () => {
    const heightInCm = parseFloat(height);
  
    let idealWeight = 0;
    if (gender === 'male') {
      idealWeight = heightInCm - 100 - ((heightInCm - 150) / 4);
    } else if (gender === 'female') {
      idealWeight = heightInCm - 100 - ((heightInCm - 150) / 2.5);
    }
  
    return idealWeight.toFixed(2);
  };

  const activityLevels = [
    { label: 'Az Aktif (Ofis İşleri)', value: 'sedentary' },
    { label: 'Hafif Aktif (Hafif Egzersiz)', value: 'lightlyActive' },
    { label: 'Orta Aktif (Orta Derecede Egzersiz)', value: 'moderatelyActive' },
    { label: 'Çok Aktif (Yoğun Egzersiz)', value: 'veryActive' },
    { label: 'Süper Aktif (Profesyonel Sporcular)', value: 'superActive' },
  ];

  const calculateBMI = () => {
    if (weight && height && age) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);

      let interpretation = '';
      if (calculatedBMI < 16) {
        interpretation = 'Çok zayıf';
      } else if (calculatedBMI < 16.9) {
        interpretation = 'Zayıf';
      } else if (calculatedBMI < 18.4) {
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

  const calculateDailyCalories = () => {
    const activityMultiplier = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      superActive: 1.9,
    };

    // Calculate BMR based on gender and Harris-Benedict equation
    let BMR = 0;
    if (gender === 'male') {
      BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const dailyCalories = BMR * activityMultiplier[activityLevel];
    setDailyCalories(dailyCalories.toFixed(2));
  };

  const calculateDailyWater = () => {
    const waterPerKilogram = 38;
    const dailyWaterAmount = waterPerKilogram * weight;
    setDailyWater(dailyWaterAmount.toFixed(2));
  };

  const handleCalculatePress = () => {
    if (!isFormValid()) {
      // Eğer form eksik ise hata mesajı gösterme veya gerekli işlemleri yapma
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    calculateBMI();
    calculateDailyCalories();
    calculateDailyWater();
    const calculatedIdealWeight = calculateIdealWeight(); // Ideal kiloyu hesapla
    setIdealWeight(calculatedIdealWeight); // State'i güncelle
  };

  const genders = [
    { label: 'Erkek', value: 'male' },
    { label: 'Kadın', value: 'female' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sağlık Hesaplayıcı</Text>
      <View style={styles.inputContainer}>
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
        <CustomPicker
          options={activityLevels}
          selectedValue={activityLevel}
          onValueChange={value => setActivityLevel(value)}
        />
        <CustomPicker
          options={genders}
          selectedValue={gender}
          onValueChange={value => setGender(value)}
        />
        <Button title="Hesapla" onPress={handleCalculatePress} />
      </View>
      {bmi !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Vücut Kitle İndeksi: {bmi.value}</Text>
          <Text style={styles.resultText}>Durum: {bmi.interpretation}</Text>
        </View>
      )}
      {dailyCalories !== null && (
        <Text style={styles.resultText}>Günlük Kalori İhtiyacı: {dailyCalories} kcal</Text>
      )}
      {dailyWater !== null && (
        <Text style={styles.resultText}>Günlük Su İhtiyacı: {dailyWater} ml</Text>
      )}
      {idealWeight !== null && (
        <Text style={styles.resultText}>İdeal Kilo: {idealWeight} kg</Text>
      )}
      <Text style={styles.infoText}>
        Sağlığınızı kontrol etmek ve düzenli olarak egzersiz yapmak önemlidir. Dünya Sağlık Örgütü tarafından
        belirlenen Vücut Kitle İndeksi kategorilerine göre değerlendirme yapılmıştır.
      </Text>
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
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input: {
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
    fontSize: typography.healthText,
    marginBottom: 10,
  },
  infoText: {
    fontSize: typography.healthInfo,
    marginTop: 20,
    textAlign: 'center',
    color: 'gray',
    maxWidth: "94%"
  },
});

export default HealthCalculator;


