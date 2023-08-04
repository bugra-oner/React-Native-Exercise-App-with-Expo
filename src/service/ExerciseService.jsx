import AsyncStorage from "@react-native-async-storage/async-storage";
import ExerciseModel from "./ExerciseModel";

let exercises = [
  { name: 'Push Ups', sets: 5, reps: [10, 12, 15, 10, 8], rate: 2, image: 'push_ups' },
  { name: 'Sit Ups', sets: 5, reps: [15, 20, 25, 20, 15], rate: 1, image: 'sit_ups' },
  { name: 'Calf Raises', sets: 5, reps: [20, 25, 30, 25, 20], rate: 1, image: 'calf_raises' },
  { name: 'Squats', sets: 5, reps: [10, 15, 20, 15, 10], rate: 1, image: 'squats' },
];

let upperBodyExercises = [
  { name: 'Push Ups', sets: 5, reps: [10, 12, 15, 10, 8], rate: 2, image: 'push_ups' },
  { name: 'Sit Ups', sets: 5, reps: [15, 20, 25, 20, 15], rate: 1, image: 'sit_ups' },
  { name: 'Plank', sets: 5, reps: [20, 25, 30, 25, 20], rate: 1, image: 'calf_raises' },
  { name: 'Cross Push Up', sets: 5, reps: [10, 15, 20, 15, 10], rate: 1, image: 'squats' },
]

let lowerBody = [
  { name: 'Push Ups', sets: 5, reps: [10, 12, 15, 10, 8], rate: 2, image: 'push_ups' },
  { name: 'Sit Ups', sets: 5, reps: [15, 20, 25, 20, 15], rate: 1, image: 'sit_ups' },
  { name: 'Calf Raises', sets: 5, reps: [20, 25, 30, 25, 20], rate: 1, image: 'calf_raises' },
  { name: 'Squats', sets: 5, reps: [10, 15, 20, 15, 10], rate: 1, image: 'squats' },
]

let flexibleExercises = [
  { name: 'New Exercise 1', sets: 4, reps: [12, 15, 18, 12], rate: 1, image: 'new_exercise_1' },
  { name: 'New Exercise 2', sets: 3, reps: [8, 10, 12,20], rate: 1, image: 'new_exercise_2' },
  { name: 'New Exercise 3', sets: 3, reps: [8, 10, 12,20], rate: 1, image: 'new_exercise_3' },
];

const increaseRepsByLevel = (exercise, level) => {
  return exercise.reps.map(rep => rep + exercise.rate * (level - 1));
};

const updateAllExercises = (level) => {
  exercises = exercises.map(exercise => ({
    ...exercise,
    reps: increaseRepsByLevel(exercise, level),
  }));
};

const getLevel = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return Number(value);
    }
  } catch (error) {
    console.log(error);
  }
};

const getTotalWorkouts = () => {
  return exercises.length + flexibleExercises.length;
};

const getTotalReps = () => {
  let totalReps = 0;
  exercises.forEach(exercise => {
    totalReps += exercise.reps.reduce((acc, rep) => acc + rep, 0);
  });

  flexibleExercises.forEach(exercise => {
    totalReps += exercise.reps.reduce((acc, rep) => acc + rep, 0);
  });

  return totalReps;
};

const calculateStatistics = () => {
  // Calculate total workouts
  const totalWorkouts = exercises.length + flexibleExercises.length;

  // Calculate total reps
  let totalReps = 0;
  exercises.forEach(exercise => {
    totalReps += exercise.reps.reduce((acc, rep) => acc + rep, 0);
  });

  flexibleExercises.forEach(exercise => {
    totalReps += exercise.reps.reduce((acc, rep) => acc + rep, 0);
  });

  return { totalWorkouts, totalReps };
};

const getExercises = () => exercises;

const getUpperBodyExercises = () => upperBodyExercises;

export default {
  flexibleExercises,
  getExercises,
  updateAllExercises,
  increaseRepsByLevel,
  getTotalWorkouts,
  getTotalReps,
  getLevel,
  calculateStatistics,
  getUpperBodyExercises,
  
};


