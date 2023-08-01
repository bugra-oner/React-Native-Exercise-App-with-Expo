const exercises = [
  { name: 'Push Ups', sets: 5, reps: [10, 12, 15, 10, 8], rate: 2, image: 'push_ups' },
  { name: 'Sit Ups', sets: 5, reps: [15, 20, 25, 20, 15], rate: 1, image: 'sit_ups' },
  { name: 'Calf Raises', sets: 5, reps: [20, 25, 30, 25, 20], rate: 1, image: 'calf_raises' },
  { name: 'Squats', sets: 5, reps: [10, 15, 20, 15, 10], rate: 1, image: 'squats' },
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

const getExercises = () => exercises;

export default {
  getExercises,
  updateAllExercises,
  increaseRepsByLevel,
};


