import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Bu satırı ekledim
import ExerciseService from '../../service/ExerciseService';
import i18n from '../../i18n/i18n';

const StatisticsScreen = () => {
  const [level, setLevel] = useState(1);
  const [workout2Level, setWorkout2Level] = useState(1);
  const [workout3Level, setWorkout3Level] = useState(1);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState(0);

  useEffect(() => {
    loadLevels();
    getDataFromAsyncStorage(); // Bu satırı ekledim
    calculateStatistics();
  }, []);

  const getDataFromAsyncStorage = async () => {
    try {
      const storedStatus = await AsyncStorage.getItem('@workoutStatus');
      if (storedStatus !== null) {
        const workoutStatus = JSON.parse(storedStatus);
        setLevel(workoutStatus['HomeFullBodyWorkout'].level);
        setCompletedWorkouts(workoutStatus['HomeFullBodyWorkout'].completedCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadLevels = async () => {
    try {
      const savedLevel = await ExerciseService.getLevel('@level');
      const savedWorkout2Level = await ExerciseService.getLevel('@workout2Level');
      const savedWorkout3Level = await ExerciseService.getLevel('@workout3Level');

      setLevel(savedLevel);
      setWorkout2Level(savedWorkout2Level);
      setWorkout3Level(savedWorkout3Level);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateStatistics = () => {
    // Calculate total workouts
    const totalWorkouts = ExerciseService.getExercises()?.length || 0;
    setTotalWorkouts(totalWorkouts);

    // Calculate total reps
    let totalReps = 0;
    ExerciseService.getExercises()?.forEach((exercise) => {
      const totalRepsDone = exercise.reps.slice(0, level - 1).reduce((acc, rep) => acc + rep, 0);
      totalReps += totalRepsDone * exercise.sets;
    });
    setTotalReps(totalReps);
  };

  const getTotalRepsForExercise = (exercise, level) => {
    const totalRepsDone = exercise.reps.slice(0, level - 1).reduce((acc, rep) => acc + rep, 0);
    return totalRepsDone * exercise.sets;
  };

 


  const renderItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseReps}>
        Total Reps: {getTotalRepsForExercise(item, level)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
       <Text style={styles.title}>{i18n.t('Statistic')}</Text>
      <Text style={styles.statText}>{i18n.t('totalWorkouts')}: {completedWorkouts}</Text>
      <Text style={styles.statText}>{i18n.t('totalReps')}: {totalReps}</Text>
      <Text style={styles.statText}>Level: {level}</Text>
      <Text style={styles.statText}>Level for Workout 1: {level}</Text>
      <Text style={styles.statText}>Level for Workout 2: {workout2Level}</Text>
      <Text style={styles.statText}>Level for Workout 3: {workout3Level}</Text>

      {/* Total Reps for Each Exercise */}
      <Text style={styles.subtitle}>Total Reps for Each Exercise:</Text>
      <FlatList
        data={ExerciseService.getExercises()}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.list}
      />
      {/* Diğer istatistikler buraya eklenebilir */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statText: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
  },
  exerciseItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseReps: {
    fontSize: 14,
  },
});

export default StatisticsScreen;



