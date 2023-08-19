import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ProteinCalculator() {
  const [weight, setWeight] = useState('');
  const [proteinAmount, setProteinAmount] = useState(0);

  const calculateProteinAmount = () => {
    if (weight) {
      // Protein hesaplama formülü: Vücut ağırlığı (kg) * Protein katsayısı (örneğin 1.2-2.0)
      const proteinCoefficient = 1.5; // Örnek protein katsayısı
      const protein = parseFloat(weight) * proteinCoefficient;
      setProteinAmount(protein.toFixed(2)); // Protein miktarını en fazla 2 ondalık basamakla göster
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vücut Ağırlığı (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <Button title="Protein Miktarını Hesapla" onPress={calculateProteinAmount} />
      <Text style={styles.resultText}>
        Günlük Protein İhtiyacı: {proteinAmount} gram
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    marginTop: 20,
  },
});