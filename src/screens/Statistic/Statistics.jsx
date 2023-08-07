import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Bu satırı ekledim
import ExerciseService from '../../service/ExerciseService';
import i18n from '../../i18n/i18n';

const StatisticsScreen = () => {
  const [level, setLevel] = useState(1);
  const [UpperBodyLevel, setUpperBodyLevel] = useState(1);
  const [workout3Level, setWorkout3Level] = useState(1);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState(0);

  useEffect(() => {
    
    getDataFromAsyncStorage(); // Bu satırı ekledim
    
  }, []);

  const getDataFromAsyncStorage = async () => {
    try {
      const storedStatus = await AsyncStorage.getItem('@workoutStatus');
      const upperBodyTest = await AsyncStorage.getItem('@upperBodyWorkoutStatus')
      console.log(upperBodyTest,"test")
      console.log(storedStatus,"storedStatusTest");
      if (storedStatus !== null) {
        const workoutStatus = JSON.parse(storedStatus);
        console.log(workoutStatus,'burayı dene')
        setLevel(workoutStatus['HomeFullBodyWorkout'].level);
        setCompletedWorkouts(workoutStatus['HomeFullBodyWorkout'].completedCount);
        setUpperBodyLevel(workoutStatus['UpperBodyWorkout'].level);
        // Veri çekildikten sonra istatistikleri hesapla ve workoutStatus verisini geç
        calculateStatistics(workoutStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const calculateStatistics = (workoutStatus) => {
    let totalReps = 0;
    const exercises = ExerciseService.getExercises();
    exercises.forEach((exercise) => {
      if (workoutStatus[exercise.name]) {
        const completedExerciseStats = workoutStatus[exercise.name];
        totalReps += completedExerciseStats.totalReps;
      }
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
      <Text style={styles.statText}></Text>
      <Text style={styles.statText}></Text>
      <Text style={styles.statText}>Level for Workout 2: {UpperBodyLevel}</Text>
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
    backgroundColor: 'white',
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



