import React, { useEffect, useState } from 'react';
import { Alert,View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import ExerciseService from '../../service/ExerciseService';

const images = {
  push_ups: require('../../assets/push_ups.png'),
  sit_ups: require('../../assets/sit_ups.png'),
  calf_raises: require('../../assets/calf_raises.png'),
  squats: require('../../assets/squats.png'),
};

let workoutStatus = {
  'HomeFullBodyWorkout': {
    completedCount: 0,
    level: 1,
  },
};

const WorkoutScreen = () => {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercises, setExercises] = useState(ExerciseService.getExercises());
  const [exerciseReps, setExerciseReps] = useState(ExerciseService.increaseRepsByLevel(exercises[0], level));

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const newReps = ExerciseService.increaseRepsByLevel(exercises[exerciseIndex], level);
    setExerciseReps(newReps);
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
      const storedStatus = await AsyncStorage.getItem('@workoutStatus');
      if (storedStatus === null) {
        await AsyncStorage.setItem('@workoutStatus', JSON.stringify(workoutStatus));
      } else {
        workoutStatus = JSON.parse(storedStatus);
      }
      
      const savedExerciseIndex = await AsyncStorage.getItem('@exerciseIndex');
      const savedCurrentSet = await AsyncStorage.getItem('@currentSet');
      
      setLevel(workoutStatus['HomeFullBodyWorkout'].level);
      if (savedExerciseIndex) setExerciseIndex(JSON.parse(savedExerciseIndex));
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@workoutStatus', JSON.stringify(workoutStatus));
      await AsyncStorage.setItem('@exerciseIndex', JSON.stringify(exerciseIndex));
      await AsyncStorage.setItem('@currentSet', JSON.stringify(currentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteSet = async () => {
    if (currentSet < exercises[exerciseIndex].sets) {
      setCurrentSet(currentSet + 1);
    } else {
      if (exerciseIndex < exercises.length - 1) {
        setExerciseIndex(exerciseIndex + 1);
        setCurrentSet(1);
      } else {
        handleCompleteWorkout();
        return;
      }
    }
    
    const newReps = ExerciseService.increaseRepsByLevel(exercises[exerciseIndex], level);
    setExerciseReps(newReps);
    setRestTime(currentSet * 10 + 20);
    setIsResting(true);
  };

  const handleResetWorkout = () => {
    setExerciseIndex(0);
    setCurrentSet(1);
    setRestTime(0);
    setIsResting(false);
  };

  const handleCompleteWorkout = () => {
    Alert.alert(
      'Workout Completed',
      'How did you find the workout?',
      [
        {
          text: 'It was easy for me',
          onPress: async () => {
            workoutStatus['HomeFullBodyWorkout'].completedCount += 1;
            workoutStatus['HomeFullBodyWorkout'].level = level + 1;
            await AsyncStorage.setItem('@workoutStatus', JSON.stringify(workoutStatus));
            setLevel(level + 1);
            handleResetWorkout();
          }
        },
        {
          text: 'It was just right',
          onPress: async () => {
            workoutStatus['HomeFullBodyWorkout'].completedCount += 1;
            await AsyncStorage.setItem('@workoutStatus', JSON.stringify(workoutStatus));
            handleResetWorkout();
          }
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  

  const exercise = exercises[exerciseIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Level: {level}</Text>
      <Text style={styles.text}>Exercise: {exercise.name}</Text>
      <View style={styles.setsContainer}>
        {exerciseReps.map((rep, index) => (
          <View
            key={index}
            style={[
              styles.setTextContainer,
              currentSet === index + 1 && styles.activeSetContainer,
            ]}
          >
            <Text style={[styles.setText, currentSet === index + 1 && styles.activeSetText]}>
              {rep}
            </Text>
          </View>
        ))}
      </View>
      <Image source={images[exercise.image]} style={styles.image} />
      <ProgressBar progress={currentSet / exercise.sets} color="#00ff00" />
      {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}
      
      <View style={styles.buttonContainer}>
      {!isResting &&
        (exerciseIndex < exercises.length - 1 || currentSet < exercises[exerciseIndex].sets ?
          <Button title="Complete Set" onPress={handleCompleteSet} /> :
          <Button title="Complete Workout" onPress={handleCompleteWorkout} />
        )
      }
      {isResting && <Button title="Skip Rest" onPress={() => setIsResting(false)} />}
      <Button title="Reset Workout" onPress={handleResetWorkout} />
    </View>
      </View>
    
  );
}

export default WorkoutScreen;

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




