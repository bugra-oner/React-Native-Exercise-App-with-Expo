import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image,  StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';


const images = {
  push_ups: require('../../assets/push_ups.png'),
  sit_ups: require('../../assets/sit_ups.png'),
  calf_raises: require('../../assets/calf_raises.png'),
  squats: require('../../assets/squats.png'),
}

const exercises = [
  { name: 'Push Ups', sets: [4, 4, 4, 5, 6], rate: 2, image: 'push_ups' },
  { name: 'Sit Ups', sets: [5, 5, 5, 6, 7], rate: 1, image: 'sit_ups' },
  { name: 'Calf Raises', sets: [3, 4, 4, 5, 6], rate: 1, image: 'calf_raises' },
  { name: 'Squats', sets: [3, 3, 3, 4, 5], rate: 1, image: 'squats' },
];

const calculateSets = (level, sets) => {
  const additionalSets = Math.floor(level / 15); // 15 seviyede bir set ekler.
  return [...sets, ...new Array(additionalSets).fill(0)];
};

export default function WorkoutScreen() {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exerciseSets, setExerciseSets] = useState(exercises[0].sets);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const newSets = calculateSets(level, exercises[exerciseIndex].sets);
    setExerciseSets(newSets);
  }, [level, exerciseIndex]);

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

  const increaseSetsByLevel = (exercise) => {
    return exercise.sets.map((set) => set + exercise.rate * (level - 1));
  };

  const handleCompleteSet = () => {
    const exercise = exercises[exerciseIndex];
    const increasedSets = increaseSetsByLevel(exercise);
    if (currentSet < increasedSets.length) {
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
    setRestTime(currentSet * 10 + 20);
    setIsResting(true);
  };

  const handleResetWorkout = () => {
    setExerciseIndex(0);
    setCurrentSet(1);
    setRestTime(0);
    setIsResting(false);
  };

  const exercise = exercises[exerciseIndex];
  const increasedSets = increaseSetsByLevel(exercise);
  const currentSetNumber = increasedSets[currentSet - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Level: {level}</Text>
      <Text style={styles.text}>Exercise: {exercise.name}</Text>
      <View style={styles.setsContainer}>
        {exerciseSets.map((set, index) => (
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
      <Image source={images[exercise.image]} style={styles.image} />
      <ProgressBar progress={currentSet / increasedSets.length} color="#00ff00" />
      {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}
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
    backgroundColor: '#333',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  setTextContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  activeSetContainer: {
    backgroundColor: '#d35400',
  },
  setText: {
    fontSize: 18,
    color: '#fff',
  },
  activeSetText: {
    color: '#2c3e50',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  restTimeText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


