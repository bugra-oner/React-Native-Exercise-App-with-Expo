import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import ExerciseService from '../../service/ExerciseService';

import LottieView from 'lottie-react-native';

import Header from '../../components/views/Header';
import { useTranslation } from 'react-i18next';

import LinearView from '../../components/views/LinearView';
import colors from '../../constants/colors';


import DoneButton from '../../components/buttons/DoneButton';
import CancelButton from '../../components/buttons/CancelButton';
import RestButton from '../../components/buttons/RestButton';



const animations = {
  push_ups: require('../../assets/animations/push_ups_animations.json'),
};

let singlePushUpWorkout = {
  "SinglePushUpWorkout": {
    completedCount: 0,
    level: 1,
  },
};

const SinglePushUpWorkoutScreen = ({ navigation }) => {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercise] = useState(ExerciseService.getExercises()[exerciseIndex]);
  const [exerciseReps, setExerciseReps] = useState(ExerciseService.increaseRepsByLevel(exercise, level));
  const [totalReps, setTotalReps] = useState(0);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const newReps = ExerciseService.increaseRepsByLevel(exercise, level);
    setExerciseReps(newReps);
  }, [level]);

  useEffect(() => {
    storeData();
  }, [level, currentSet, totalReps]);

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
      const storedStatus = await AsyncStorage.getItem('@singlePushUpWorkoutStatus');
      if (storedStatus === null) {
        await AsyncStorage.setItem('@singlePushUpWorkoutStatus', JSON.stringify({}));
      } else {
        const singlePushUpWorkoutStatusData = JSON.parse(storedStatus);
        const currentLevel = singlePushUpWorkoutStatusData['SinglePushUpWorkout']?.level || 1;
        setLevel(currentLevel);
      }

      const savedCurrentSet = await AsyncStorage.getItem('@singlePushUpCurrentSet');
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@singlePushUpWorkoutStatus', JSON.stringify({
        'SinglePushUpWorkout': { level }
      }));
      await AsyncStorage.setItem('@singlePushUpCurrentSet', JSON.stringify(currentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteSet = async () => {
    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1);
    } else {
      handleCompleteWorkout();
      return;
    }

    const newReps = ExerciseService.increaseRepsByLevel(exercise, level);
    setExerciseReps(newReps);
    setRestTime(currentSet * 10 + 20);
    setIsResting(true);

    const repsInThisSet = newReps.reduce((acc, rep) => acc + rep, 0);
    setTotalReps((prevTotalReps) => prevTotalReps + repsInThisSet);

    const completedExerciseStats = singlePushUpWorkout[exercise.name] || { completedCount: 0, totalReps: 0 };
    completedExerciseStats.completedCount += 1;
    completedExerciseStats.totalReps += repsInThisSet;

    singlePushUpWorkout[exercise.name] = completedExerciseStats;

    try {
      await AsyncStorage.setItem('@singlePushUpWorkoutStatus', JSON.stringify(singlePushUpWorkout));
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetWorkout = () => {
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
            singlePushUpWorkout['SinglePushUpWorkout'].completedCount += 1;
            singlePushUpWorkout['SinglePushUpWorkout'].level = level + 1;
            await AsyncStorage.setItem('@singlePushUpWorkoutStatus', JSON.stringify(singlePushUpWorkout));
            setLevel(level + 1);
            handleResetWorkout();
          }
        },
        {
          text: 'It was just right',
          onPress: async () => {
            singlePushUpWorkout['SinglePushUpWorkout'].completedCount += 1;
            await AsyncStorage.setItem('@singlePushUpWorkoutStatus', JSON.stringify(singlePushUpWorkout));
            handleResetWorkout();
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  const { t } = useTranslation();

  return (
    <>
      <Header
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        DefaultColor='#283048'
        LeftIconOnPress={() => navigation.goBack()}
        RightIcon='atom-variant'
        title={t('SinglePushUpWorkout')}
      />
      <LinearView>
        <Text style={styles.text}>Level: {level}</Text>
        <Text style={styles.text}>{t('Exercise')}: {exercise?.name}</Text>
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
        <LottieView source={animations[exercise.image]} autoPlay loop style={styles.image} />
        <ProgressBar progress={currentSet / exercise.sets} color="#00ff00" />
        {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}

        <View style={styles.buttonContainer}>
          {!isResting &&
            (currentSet < exercise.sets ?
              <DoneButton title={t("CompleteSet")} onPress={handleCompleteSet} /> :
              <DoneButton title={t("CompleteExc")} onPress={handleCompleteWorkout} />
            )
          }
          {isResting && <RestButton title={t("SkipRest")} onPress={() => setIsResting(false)} />}
          <CancelButton style={styles.button} title={t("ResetWorkout")} onPress={handleResetWorkout} />
        </View>
      </LinearView>
    </>
  );
}



const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#ffffff',
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: "8%"
  },
  setTextContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'rgba(72, 79, 136, 0.8)'
  },
  activeSetContainer: {
    backgroundColor: 'green',
  },
  setText: {
    fontSize: 18,
    color: '#fff',
  },
  activeSetText: {
    color: '#2c3e50',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: "center",
  },
  restTimeText: {
    fontSize: 18,
    color: 'white',
    marginVertical: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default SinglePushUpWorkoutScreen;
