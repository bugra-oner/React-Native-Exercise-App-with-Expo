import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const exercises = [
  { name: 'Push Ups', sets: [4, 4, 4, 5, 6], difficulty: 'easy' },
  { name: 'Sit Ups', sets: [5, 5, 5, 6, 7], difficulty: 'medium' },
  { name: 'Calf Raises', sets: [3, 4, 4, 5, 6], difficulty: 'hard' },
  { name: 'Squats', sets: [3, 3, 3, 4, 5], difficulty: 'medium' },
];

export default function WorkoutScreen() {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    storeData();
  }, [level, exerciseIndex, currentSet]);

  useEffect(() => {
    if (isResting && restTime > 0) {
      const interval = setInterval(() => {
        setRestTime(restTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isResting, restTime]);

  const getDataFromAsyncStorage = async () => {
    try {
      const savedLevel = await AsyncStorage.getItem('@level');
      const savedExerciseIndex = await AsyncStorage.getItem('@exerciseIndex');
      const savedCurrentSet = await AsyncStorage.getItem('@currentSet');

      if (savedLevel) setLevel(JSON.parse(savedLevel));
      if (savedExerciseIndex) setExerciseIndex(JSON.parse(savedExerciseIndex));
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@level', JSON.stringify(level));
      await AsyncStorage.setItem('@exerciseIndex', JSON.stringify(exerciseIndex));
      await AsyncStorage.setItem('@currentSet', JSON.stringify(currentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteSet = () => {
    if (currentSet < exercises[exerciseIndex].sets.length) {
      setCurrentSet(currentSet + 1);
    } else {
      setCurrentSet(1);
      if (exerciseIndex < exercises.length - 1) {
        setExerciseIndex(exerciseIndex + 1);
      } else {
        setExerciseIndex(0);
        setLevel(level + 1);
      }
    }
    setRestTime(currentSet * 10 + 20); // 20 saniye dinlenme süresi, sonraki setlere 10 saniye ekleyerek
    setIsResting(true);
  };

  const handleResetWorkout = () => {
    setLevel(1);
    setExerciseIndex(0);
    setCurrentSet(1);
    setRestTime(0);
    setIsResting(false);
  };

  const exercise = exercises[exerciseIndex];
  const currentSetNumber = exercise.sets[currentSet - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout App</Text>
      <Text style={styles.text}>Current Level: {level}</Text>
      <Text style={styles.text}>Current Exercise: {exercise.name}</Text>
      <View style={styles.setsContainer}>
        {exercise.sets.map((set, index) => (
          <View
            key={index}
            style={[
              styles.setTextContainer,
              currentSet === index + 1 && styles.activeSetContainer,
            ]}
          >
            <Text style={[styles.setText, currentSet === index + 1 && styles.activeSetText]}>
              {set}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.progressContainer}>
        <TouchableOpacity
          style={[
            styles.circularButton,
            { borderColor: isResting ? '#f39c12' : '#00ff00' },
            { borderWidth: isResting ? 4 : 0 },
          ]}
        >
          <Text style={styles.circularButtonText}>{currentSetNumber}</Text>
        </TouchableOpacity>
        {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        {!isResting && <Button title="Complete Set" onPress={handleCompleteSet} />}
        {isResting && <Button title="Skip Rest" onPress={() => setIsResting(false)} />}
        <Button title="Reset Workout" onPress={handleResetWorkout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  setTextContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  activeSetContainer: {
    backgroundColor: 'blue',
  },
  setText: {
    fontSize: 18,
  },
  activeSetText: {
    color: 'white',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circularButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  circularButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  restTimeText: {
    fontSize: 18,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
