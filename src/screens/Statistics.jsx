import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExerciseService from '../service/ExerciseService';

export default function StatisticsScreen() {
  const [level, setLevel] = useState(1);
  const [workout2Level, setWorkout2Level] = useState(1);
  const [workout3Level, setWorkout3Level] = useState(1);

  useEffect(() => {
    loadLevels();
  }, []);

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

  const totalWorkouts = ExerciseService.getTotalWorkouts();
  const totalReps = ExerciseService.getTotalReps();

  const getTotalRepsForExercise = (exercise, level) => {
    const totalRepsDone = exercise.reps.slice(0, level-1).reduce((acc, rep) => acc + rep, 0);
    return totalRepsDone * exercise.sets;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.text}>Total Workouts: {totalWorkouts}</Text>
      <Text style={styles.text}>Total Reps: {totalReps}</Text>
      <Text style={styles.text}>Level for Workout 1: {level}</Text>
      <Text style={styles.text}>Level for Workout 2: {workout2Level}</Text>
      <Text style={styles.text}>Level for Workout 3: {workout3Level}</Text>

      {/* Total Reps for Each Exercise */}
      <Text style={styles.text}>Total Reps for Each Exercise:</Text>
      {ExerciseService.getExercises().map((exercise, index) => (
        <Text key={index} style={styles.text}>
          {exercise.name}: {getTotalRepsForExercise(exercise, level)}
        </Text>
      ))}
      {ExerciseService.flexibleExercises.map((exercise, index) => (
        <Text key={index} style={styles.text}>
          {exercise.name}: {getTotalRepsForExercise(exercise, workout2Level)}
        </Text>
      ))}
      {/* Diğer istatistikler buraya eklenebilir */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});


