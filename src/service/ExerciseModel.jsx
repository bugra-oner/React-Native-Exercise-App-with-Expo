// ExerciseModel.js
class ExerciseModel {
  constructor(name, sets, reps, rate) {
    this.name = name;
    this.sets = sets;
    this.reps = reps;
    this.rate = rate;
  }

  getTotalRepsDone(level) {
    const increasedReps = this.increaseRepsByLevel(level);
    return increasedReps.reduce((total, rep) => total + rep, 0);
  }

  // Özel artırma algoritması
  increaseRepsByLevel(level) {
    return this.reps.map((rep) => rep + this.rate * (level - 1));
  }
}

export default ExerciseModel;
