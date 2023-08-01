import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/navigationRef';
import ExerciseService from '../service/ExerciseService';

export default function LevelSelector() {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const loadLevel = async () => {
    try {
      const savedLevel = await AsyncStorage.getItem('@level');
      const savedExerciseIndex = await AsyncStorage.getItem('@exerciseIndex');
      if (savedLevel !== null) {
        setLevel(Number(savedLevel));
      }
      if (savedExerciseIndex !== null) {
        setExerciseIndex(Number(savedExerciseIndex));
      }
    } catch (error) {
      console.error(error);
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
              console.error(error);
            }
          } 
        }
      ]
    );
  };

  useEffect(() => {
    loadLevel();
  }, []);

  useEffect(() => {
    const allExercises = ExerciseService.getExercises();
    const exercise = allExercises[exerciseIndex];
    setSelectedExercise(exercise);
  }, [exerciseIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Level: {level}</Text>
      {selectedExercise && (
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseName}>{selectedExercise.name}</Text>
          <Text style={styles.exerciseText}>Sets: {selectedExercise.sets}</Text>
          <Text style={styles.exerciseText}>Reps per set: {ExerciseService.increaseRepsByLevel(selectedExercise, level).join(', ')}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Continue Where You Left Off" onPress={() => navigate('Workout')} />
        <Button title="Increase Level" onPress={increaseLevel} />
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
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  exerciseContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
});







