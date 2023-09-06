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

import WorkoutCompletionModal from '../../components/modals/WorkoutModals';

const animations = {
  triceps_dips: require('../../assets/animations/triceps_dips')
};

let singleTricepsWorkout = {
  "SingleTricepsWorkout": {
    completedCount: 0,
    level: 1,
  },
};

import styles from './style';

const SingleTricepsWorkoutScreen = ({ navigation }) => {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercise] = useState(ExerciseService.getSingleTriceps());
  const [exerciseReps, setExerciseReps] = useState(ExerciseService.increaseRepsByLevel(exercise, level));
  const [totalReps, setTotalReps] = useState(0);
  const [modalVisible, setModalVisible] = useState(false)

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
      const storedStatus = await AsyncStorage.getItem('@singleTricepsWorkoutStatus');
      if (storedStatus === null) {
        await AsyncStorage.setItem('@singleTricepsWorkoutStatus', JSON.stringify({}));
      } else {
        const singleTricepsWorkoutStatusData = JSON.parse(storedStatus);
        const currentLevel = singleTricepsWorkoutStatusData['SingleTricepsWorkout']?.level || 1;
        setLevel(currentLevel);
      }

      const savedCurrentSet = await AsyncStorage.getItem('@singleTricepsCurrentSet');
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@singleTricepsWorkoutStatus', JSON.stringify({
        'SingleTricepsWorkout': { level }
      }));
      await AsyncStorage.setItem('@singleTricepsCurrentSet', JSON.stringify(currentSet));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteSet = async () => {
    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1);
    } else {
     // handleCompleteWorkout();
      return;
    }

    const newReps = ExerciseService.increaseRepsByLevel(exercise, level);
    setExerciseReps(newReps);
    setRestTime(currentSet * 10 + 20);
    setIsResting(true);

    const repsInThisSet = newReps.reduce((acc, rep) => acc + rep, 0);
    setTotalReps((prevTotalReps) => prevTotalReps + repsInThisSet);

    const completedExerciseStats = singleTricepsWorkout[exercise.name] || { completedCount: 0, totalReps: 0 };
    completedExerciseStats.completedCount += 1;
    completedExerciseStats.totalReps += repsInThisSet;

    singleTricepsWorkout[exercise.name] = completedExerciseStats;

    try {
      await AsyncStorage.setItem('@singleTricepsWorkoutStatus', JSON.stringify(singleTricepsWorkout));
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetWorkout = () => {
    setCurrentSet(1);
    setRestTime(0);
    setIsResting(false);
  };

  const handleStayLevel = async () => {
    singleTricepsWorkout['SingleTricepsWorkout'].completedCount += 1;
    await AsyncStorage.setItem('@singleTricepsWorkoutStatus', JSON.stringify(singleTricepsWorkout));
    handleResetWorkout();
    setModalVisible(false);
  };
  
  const handleLevelUp = async() => {
      singleTricepsWorkout['SingleTricepsWorkout'].completedCount += 1;
     singleTricepsWorkout['SingleTricepsWorkout'].level = level + 1;
     await AsyncStorage.setItem('@singleTricepsWorkoutStatus', JSON.stringify(singleTricepsWorkout));
     setLevel(level + 1);
     handleResetWorkout();
     setModalVisible(false);
  };

  // const handleCompleteWorkout = () => {
  //   Alert.alert(
  //     'Workout Completed',
  //     'How did you find the workout?',
  //     [
  //       {
  //         text: 'It was easy for me',
  //         onPress: async () => {
  //           singleTricepsWorkout['SingleTricepsWorkout'].completedCount += 1;
  //           singleTricepsWorkout['SingleTricepsWorkout'].level = level + 1;
  //           await AsyncStorage.setItem('@singleTricepsWorkoutStatus', JSON.stringify(singleTricepsWorkout));
  //           setLevel(level + 1);
  //           handleResetWorkout();
  //         }
  //       },
  //       {
  //         text: 'It was just right',
  //         onPress: async () => {
  //           singleTricepsWorkout['SingleTricepsWorkout'].completedCount += 1;
  //           await AsyncStorage.setItem('@singleTricepsWorkoutStatus', JSON.stringify(singleTricepsWorkout));
  //           handleResetWorkout();
  //         }
  //       },
  //       { text: 'Cancel', style: 'cancel' },
  //     ],
  //     { cancelable: true },
  //   );
  // };

  const { t } = useTranslation();

  return (
    <>
      <Header
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        DefaultColor='#283048'
        LeftIconOnPress={() => navigation.goBack()}
        RightIcon='atom-variant'
        title={t('SingleTricepsWorkout')}
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
        {isResting && <Text style={styles.restTimeText}>{t("RestTime")} {restTime}</Text>}

        <View style={styles.buttonContainer}>
          {!isResting &&
            (currentSet < exercise.sets ?
              <DoneButton title={t("CompleteSet")} onPress={handleCompleteSet} /> :
              <DoneButton title={t("CompleteExc")} onPress={()=> setModalVisible(true)} />
            )
          }
          {isResting && <RestButton title={t("SkipRest")} onPress={() => setIsResting(false)} />}
          <CancelButton style={styles.button} title={t("ResetWorkout")} onPress={handleResetWorkout} />
        </View>
        <WorkoutCompletionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onEasy={() => handleLevelUp()}
          onJustRight={() => handleStayLevel()}
          />
      </LinearView>
    </>
  );
}

export default SingleTricepsWorkoutScreen;

