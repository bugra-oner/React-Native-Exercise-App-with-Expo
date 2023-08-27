import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [waterIntake, setWaterIntake] = useState(null);

  const calculateWaterIntake = () => {
    if (weight) {
      const dailyWaterIntake = parseFloat(weight) * 0.03;
      setWaterIntake(dailyWaterIntake.toFixed(2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Günlük Su İhtiyacı Hesaplama</Text>
      <TextInput
        style={styles.input}
        placeholder="Kilonuzu girin (kg)"
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <Button title="Hesapla" onPress={calculateWaterIntake} />
      {waterIntake !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Günlük Su İhtiyacınız: {waterIntake} litre</Text>
        </View>
      )}
      <Text>
        Bu hesaplama genel bir tahmin olup, kişisel faktörleri göz önünde bulundurmanız önerilir.
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
});

export default WaterIntakeCalculator;
