import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Svg, Circle, Text as SVGText } from 'react-native-svg';

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

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    storeData();
  }, [level, exerciseIndex, currentSet]);

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
    setRestTime(currentSet * 10 + 5); // Süre hesaplaması
  };

  const renderCircle = () => {
    const exercise = exercises[exerciseIndex];
    const currentSetNumber = exercise.sets[currentSet - 1];

    const progress = (currentSet / exercise.sets.length) * 100;
    const circleRadius = 60;
    const circleStrokeWidth = 10;
    const circleCenter = circleRadius + circleStrokeWidth / 2;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const circleProgress = (circleCircumference * progress) / 100;

    return (
      <Svg width={circleCenter * 2} height={circleCenter * 2}>
        <Circle
          cx={circleCenter}
          cy={circleCenter}
          r={circleRadius}
          stroke="#00ff00"
          strokeWidth={circleStrokeWidth}
          fill="transparent"
        />
        <Circle
          cx={circleCenter}
          cy={circleCenter}
          r={circleRadius}
          stroke="#3498db"
          strokeWidth={circleStrokeWidth}
          fill="transparent"
          strokeDasharray={[circleProgress, circleCircumference]}
          transform={`rotate(-90, ${circleCenter}, ${circleCenter})`}
        />
        <SVGText
          x={circleCenter}
          y={circleCenter}
          fontSize="24"
          textAnchor="middle"
          dominantBaseline="central"
          fill="black"
        >
          {currentSetNumber}
        </SVGText>
      </Svg>
    );
  };

  const handleResetWorkout = () => {
    setLevel(1);
    setExerciseIndex(0);
    setCurrentSet(1);
    setRestTime(0);
  };

  const exercise = exercises[exerciseIndex];
  const currentSetNumber = exercise.sets[currentSet - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout App</Text>
      <Text style={styles.text}>Current Level: {level}</Text>
      <Text style={styles.text}>Current Exercise: {exercise.name}</Text>
      <Text style={styles.text}>Set: {currentSet} / {exercise.sets.length}</Text>
      <View style={styles.progressContainer}>
        {renderCircle()}
        <Text style={styles.progressText}>{exercise.sets.length - currentSet} sets left</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Complete Set" onPress={handleCompleteSet} />
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
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    fontSize: 18,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

