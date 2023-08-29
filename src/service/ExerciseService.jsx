import AsyncStorage from "@react-native-async-storage/async-storage";
import ExerciseModel from "./ExerciseModel";


let exercises = [
  { name: 'Push Ups', sets: 5, reps: [1, 2, 1, 2, 3], rate: 2, image: 'push_ups' },
  { name: 'Sit Ups', sets: 5, reps: [4, 5, 4, 6, 10], rate: 1, image: 'sit_ups' },
  { name: 'Triceps Dips', sets: 5, reps: [1, 3, 2, 3, 4], rate: 1, image: 'triceps_dips'},
  { name: 'Squats', sets: 5, reps: [3, 5, 3, 5, 6], rate: 1, image: 'squats' },
];

let upperBodyExercises = [
  { name: 'Push Ups', sets: 5, reps: [1, 2, 1, 2, 3], rate: 2, image: 'push_ups' },
  { name: 'Sit Ups', sets: 5, reps: [3, 4, 2, 5, 7], rate: 1, image: 'sit_ups' },
  { name: 'Triceps Dips', sets: 5, reps: [1, 3, 2, 3, 4], rate: 1, image: 'triceps_dips' },
]

let lowerBody = [
  { name: 'Squad', sets: 5, reps: [3, 5, 3, 5, 2], rate: 1, image: 'Squad' },
  { name: 'Single-Leg Chair Squat', sets: 5, reps: [3, 4, 2, 3, 4], rate: 1, image: 'SingleLeg' },
  { name: 'Lunges', sets: 5, reps: [4, 6, 6, 4, 8], rate: 1, image: 'Lunges' },
  //{ name: 'Squats', sets: 5, reps: [10, 15, 20, 15, 10], rate: 1, image: 'asdf' },
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
    //console.log(error);
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

const getLowerBodyExercises = () => lowerBody;

let singleSquad = { name: 'Squad', sets: 5, reps: [3, 5, 3, 5, 2], rate: 1, image: 'Squad' }

let singleSitups =  { name: 'Sit Ups', sets: 5, reps: [4, 4, 3, 5, 7], rate: 1, image: 'sit_ups' }

let singleTriceps = { name: 'Triceps Dips', sets: 5, reps: [1, 2, 3, 3, 4], rate: 1, image: 'triceps_dips'}

const getSingleSquad = () => singleSquad;

const getSingleSitups = () =>  singleSitups;

const getSingleTriceps = () => singleTriceps;



export default {
  getSingleTriceps,
  getLowerBodyExercises,
  flexibleExercises,
  getExercises,
  updateAllExercises,
  increaseRepsByLevel,
  getTotalWorkouts,
  getTotalReps,
  getLevel,
  calculateStatistics,
  getUpperBodyExercises,
  getSingleSquad,
  getSingleSitups,
};


