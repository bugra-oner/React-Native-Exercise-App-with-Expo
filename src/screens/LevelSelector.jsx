import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { navigate } from '../navigation/navigationRef';

const loadFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return Number(value);
    }
  } catch (error) {
    console.log(error);
  }
};

export default function LevelSelector() {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const loadLevel = async () => {
    const savedLevel = await loadFromAsyncStorage('@level');
    const savedExerciseIndex = await loadFromAsyncStorage('@exerciseIndex');
    if (savedLevel !== undefined) {
      setLevel(savedLevel);
    }
    if (savedExerciseIndex !== undefined) {
      setExerciseIndex(savedExerciseIndex);
    }
  };

  const increaseLevel = async () => {
    Alert.alert(
      "Leveli Artır",
      "Egzersizlerin zorluk seviyesi artacaktır. Devam etmek istiyor musunuz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        { 
          text: "Devam Et", 
          onPress: async () => {
            try {
              await AsyncStorage.setItem('@level', String(level + 1));
              setLevel(level + 1);
            } catch (error) {
              console.log(error);
            }
          } 
        }
      ]
    );
  };

  useEffect(() => {
    loadLevel();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Level: {level}</Text>
      <Button title="Kaldığın Yerden Devam Et" onPress={() => navigate('Workout')} />
      <Button title="Leveli Artır" onPress={increaseLevel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

