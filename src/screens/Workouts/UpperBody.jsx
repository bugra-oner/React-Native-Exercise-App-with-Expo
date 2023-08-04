import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseService from '../../service/ExerciseService';
import i18n from '../../i18n/i18n';

const images = {
  pull_ups: require('../../assets/pull_ups.png'),
  dumbbell_press: require('../../assets/dumbbell_press.png'),
  bicep_curls: require('../../assets/bicep_curls.png'),
  shoulder_press: require('../../assets/shoulder_press.png'),
};

let workoutStatus = {
  'UpperBodyWorkout': {
    completedCount: 0,
    level: 1,
  },
};

const UpperBodyScreen = () => {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercises, setExercises] = useState(ExerciseService.getUpperBodyExercises());
  const [exerciseReps, setExerciseReps] = useState(ExerciseService.increaseRepsByLevel(exercises[0], level));
  const [totalReps, setTotalReps] = useState(0);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const newReps = ExerciseService.increaseRepsByLevel(exercises[exerciseIndex], level);
    setExerciseReps(newReps);
  }, [level, exerciseIndex]);

  useEffect(() => {
    storeData();
  }, [level, exerciseIndex, currentSet, totalReps]);

  useEffect(() => {
    if (isResting && restTime > 0) {
      const interval = setInterval(() => {
        setRestTime(restTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isResting, restTime]);

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
      const storedStatus = await AsyncStorage.getItem('@upperBodyWorkoutStatus');
      if (storedStatus === null) {
        await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify({}));
      } else {
        const upperBodyWorkoutStatusData = JSON.parse(storedStatus);
        const currentLevel = upperBodyWorkoutStatusData['UpperBodyWorkout']?.level || 1;
        setLevel(currentLevel);
      }

      const savedExerciseIndex = await AsyncStorage.getItem('@upperBodyExerciseIndex');
      const savedCurrentSet = await AsyncStorage.getItem('@upperBodyCurrentSet');

      if (savedExerciseIndex) setExerciseIndex(JSON.parse(savedExerciseIndex));
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = () => {
    const currentExercises = ExerciseService.getUpperBodyExercises().map((exercise) => ({
      ...exercise,
      reps: ExerciseService.increaseRepsByLevel(exercise, level),
    }));
    setExercises(currentExercises);
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify({ 'UpperBodyWorkout': { level } }));
      await AsyncStorage.setItem('@upperBodyExerciseIndex', JSON.stringify(exerciseIndex));
      await AsyncStorage.setItem('@upperBodyCurrentSet', JSON.stringify(currentSet));
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
  
    // Set tamamlandığında tekrar sayılarını toplayıp toplam tekrar sayısını güncelle
    const repsInThisSet = newReps.reduce((acc, rep) => acc + rep, 0);
    setTotalReps((prevTotalReps) => prevTotalReps + repsInThisSet);
  
    // Hareket istatistiklerini güncelle
    const completedExerciseName = exercises[exerciseIndex].name;
    const completedExerciseStats = workoutStatus[completedExerciseName] || { completedCount: 0, totalReps: 0, totalSets: 0 };
    completedExerciseStats.completedCount += 1;
    completedExerciseStats.totalReps += repsInThisSet;
    completedExerciseStats.totalSets += 1; // Yeni eklenen kısım
    workoutStatus[completedExerciseName] = completedExerciseStats;
  
    // Hafızada güncellenen istatistikleri sakla
    try {
      await AsyncStorage.setItem('@workoutStatus', JSON.stringify(workoutStatus));
    } catch (error) {
      console.error(error);
    }
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
            const completedCount = await getCompletedCount('@upperBodyCompletedCount');
            const currentLevel = await getLevel('@upperBodyLevel');
            await updateWorkoutStatus('@upperBodyCompletedCount', completedCount + 1);
            await updateWorkoutStatus('@upperBodyLevel', currentLevel + 1);

            setLevel(currentLevel + 1);
            handleResetWorkout();
          },
        },
        {
          text: 'It was just right',
          onPress: async () => {
            const completedCount = await getCompletedCount('@upperBodyCompletedCount');
            await updateWorkoutStatus('@upperBodyCompletedCount', completedCount + 1);

            handleResetWorkout();
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const exercise = exercises[exerciseIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Level: {level}</Text>
      <Text style={styles.text}>Exercise: {exercise?.name}</Text>
      <View style={styles.setsContainer}>
        {exercise?.reps.map((rep, index) => (
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
      {exercise && <Image source={images[exercise.image]} style={styles.image} />}
      <ProgressBar progress={currentSet / (exercise?.sets || 1)} color="#00ff00" />
      {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}

      <View style={styles.buttonContainer}>
        {!isResting &&
          (exerciseIndex < exercises.length - 1 || currentSet < exercises[exerciseIndex]?.sets ? (
            <Button title="Complete Set" onPress={handleCompleteSet} />
          ) : (
            <Button title="Complete Workout" onPress={handleCompleteWorkout} />
          ))}
        {isResting && <Button title="Skip Rest" onPress={() => setIsResting(false)} />}
        <Button title="Reset Workout" onPress={handleResetWorkout} />
      </View>
    </View>
  );
};

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

export default UpperBodyScreen;



