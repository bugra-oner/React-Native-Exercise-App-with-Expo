import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/navigationRef';
import ExerciseService from '../service/ExerciseService';

export default function LevelSelector() {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const loadFromAsyncStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return Number(value);
      }
    } catch (error) {
     // console.log(error);
    }
  };

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
             // console.log(error);
            }
          } 
        }
      ]
    );
  };

  useEffect(() => {
    loadLevel();
  }, []);

  const exercises = ExerciseService.getExercises();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Antrenman içeriği</Text>
      <ScrollView style={styles.exercisesList}>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseText}>Sets: {exercise.sets}</Text>
            <Text style={styles.exerciseText}>Reps per set: {ExerciseService.increaseRepsByLevel(exercise, level).join(', ')}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {/* <Button title="Antrenmana başla" onPress={() => navigate('Workout')} /> */}
        <Button title="Seviye arttır" onPress={increaseLevel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exercisesList: {
    width: '100%',
    marginBottom: 20,
  },
  exerciseItem: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    backgroundColor: '#fff',
    elevation: 4, // Gölgelendirme ekledik
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
});










