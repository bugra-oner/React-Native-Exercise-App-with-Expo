import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseService from '../../service/ExerciseService';

import LottieView from 'lottie-react-native';
import LinearView from '../../components/views/LinearView';
import Header from '../../components/views/Header';

import DoneButton from '../../components/buttons/DoneButton';
import CancelButton from '../../components/buttons/CancelButton';
import RestButton from '../../components/buttons/RestButton';

import WorkoutCompletionModal from '../../components/modals/WorkoutModals';

import useRestTimer from '../../hooks/useRestTimer';

import styles from './style';

import { useTranslation } from 'react-i18next';

const animations = {
  push_ups: require('../../assets/animations/test.json'),
  sit_ups: require('../../assets/animations/sit_ups_animation.json'),
  triceps_dips: require('../../assets/animations/triceps_dips.json'),
};

let workoutStatus = {
  "UpperBodyWorkout": {
    completedCount: 0,
    level: 1,
  },
};

const UpperBodyScreen = ({navigation}) => {
  const {t} = useTranslation()
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercises, setExercises] = useState(ExerciseService.getUpperBodyExercises());
  const [exerciseReps, setExerciseReps] = useState(ExerciseService.increaseRepsByLevel(exercises[0], level));
  const [totalReps, setTotalReps] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);


  useRestTimer(isResting, restTime, setIsResting, setRestTime);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    const newReps = ExerciseService.increaseRepsByLevel(exercises[exerciseIndex], level);
    setExerciseReps(newReps);
  }, [level, exerciseIndex]);

  useEffect(() => {
    storeData();
  }, [level, exerciseIndex, currentSet, totalReps]);

  // useEffect(() => {
  //   if (isResting && restTime > 0) {
  //     const interval = setInterval(() => {
  //       setRestTime(restTime -1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isResting, restTime]);

  const getDataFromAsyncStorage = async () => {
    try {
      const storedStatus = await AsyncStorage.getItem('@upperBodyWorkoutStatus');
      //console.log(storedStatus)
      if (storedStatus === null) {
        //console.log('test1 ')
        await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify({}));
      } else {
        //console.log('test2 ')
        const upperBodyWorkoutStatusData = JSON.parse(storedStatus);
        //console.log(upperBodyWorkoutStatusData,'test 2')
        const currentLevel = upperBodyWorkoutStatusData['UpperBodyWorkout']?.level || 1;
        setLevel(currentLevel);
        // Bu kısımda ilgili verileri çektiğinizden emin olun
      }

      const savedExerciseIndex = await AsyncStorage.getItem('@upperBodyExerciseIndex');
      const savedCurrentSet = await AsyncStorage.getItem('@upperBodyCurrentSet');

      if (savedExerciseIndex) setExerciseIndex(JSON.parse(savedExerciseIndex));
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
    } catch (error) {
      //console.error(error);
    }
  };

  // const loadData = () => {
  //   const currentExercises = ExerciseService.getUpperBodyExercises().map((exercise) => ({
  //     ...exercise,
  //     reps: ExerciseService.increaseRepsByLevel(exercise, level),
  //   }));
  //   setExercises(currentExercises);
  // };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify({ 'UpperBodyWorkout': { level } }));
      await AsyncStorage.setItem('@upperBodyExerciseIndex', JSON.stringify(exerciseIndex));
      await AsyncStorage.setItem('@upperBodyCurrentSet', JSON.stringify(currentSet));
    
    } catch (error) {
      //console.error(error);
    }
  };

  const handleCompleteSet = async () => {
    if (currentSet < exercises[exerciseIndex].sets) {
      setCurrentSet(currentSet + 1);
    } else {
      if (exerciseIndex < exercises.length - 1) {
        setExerciseIndex(exerciseIndex + 1);
        setCurrentSet(1);
      } else {
        //handleCompleteWorkout();
        return;
      }
    }
  
    const newReps = ExerciseService.increaseRepsByLevel(exercises[exerciseIndex], level);
    setExerciseReps(newReps);
    setRestTime(currentSet * 10 + 20);
    setIsResting(true);
  
    // Set tamamlandığında tekrar sayılarını toplayıp toplam tekrar sayısını güncelle
    const repsInThisSet = newReps.reduce((acc, rep) => acc + rep, 0);
    setTotalReps((prevTotalReps) => prevTotalReps + repsInThisSet);
  
    // Hareket istatistiklerini güncelle
    const completedExerciseName = exercises[exerciseIndex].name;
  const completedExerciseStats = workoutStatus[completedExerciseName] || { completedCount: 0, totalReps: 0, totalSets: 0 };
  completedExerciseStats.completedCount += 1;
  completedExerciseStats.totalReps += repsInThisSet;
  completedExerciseStats.totalSets += 1;
  workoutStatus[completedExerciseName] = completedExerciseStats;
  
    // Hafızada güncellenen istatistikleri sakla
    try {
      await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify(workoutStatus));
      // Bu kısımda fullBodyWorkoutStatus'a da aynı şekilde işlem yapabilirsiniz
    } catch (error) {
      //console.error(error);
    }
  };


  

  const handleResetWorkout = () => {
    setExerciseIndex(0);
    setCurrentSet(1);
    setRestTime(0);
    setIsResting(false);
  };

  const handleStayLevel =  async () => {
    //console.log("Stay Level")
    workoutStatus['UpperBodyWorkout'].completedCount +=1;
            await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify
            (workoutStatus));
            handleResetWorkout();
            setModalVisible(false);
  }

  const handleLevelUp =  async () => {
    //console.log("Handle Level Up");
            workoutStatus['UpperBodyWorkout'].completedCount +=  1;
            workoutStatus['UpperBodyWorkout'].level = level + 1;
            await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify(workoutStatus));
            setLevel(level + 1)
            handleResetWorkout();
            setModalVisible(false);
            navigation.navigate('Home', {workoutStatus: true})
};




  // const handleCompleteWorkout = () => {
  //   Alert.alert(
  //     'Workout Completed',
  //     'How did you find the workout?',
  //     [
  //       {
  //         text: 'It was easy for me',
  //         onPress: async () => {
  //           workoutStatus['UpperBodyWorkout'].completedCount +=  1;
  //           workoutStatus['UpperBodyWorkout'].level = level + 1;
  //           await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify(workoutStatus));
  //           setLevel(level + 1)
  //           handleResetWorkout();
  //         }   
  //       },
  //       {
  //         text: 'It was just right',
  //         onPress: async () => {
  //           workoutStatus['UpperBodyWorkout'].completedCount +=1;
  //           await AsyncStorage.setItem('@upperBodyWorkoutStatus', JSON.stringify
  //           (workoutStatus));
  //           handleResetWorkout();
  //         },
  //       },
  //       { text: 'Cancel', style: 'cancel' },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  const exercise = exercises[exerciseIndex];

  return (
    <>
    <Header  
    borderBottomLeftRadius={0}
    borderBottomRightRadius={0}
    DefaultColor='#283048'
   LeftIconOnPress={()=> navigation.goBack()}
   RightIcon='atom-variant'
  title={t('UpperBodyWorkout')}/>
    <LinearView>
      <Text style={styles.text}>Level: {level}</Text>
      <Text style={styles.text}>Exercise: {exercise?.name}</Text>
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
      {exercise && <LottieView source={animations[exercise.image]} autoPlay loop style={styles.image}  />}
      <ProgressBar progress={currentSet / (exercise?.sets || 1)} color="#00ff00" />
      {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}

      <View style={styles.buttonContainer}>
        {!isResting &&
          (exerciseIndex < exercises.length - 1 || currentSet < exercises[exerciseIndex]?.sets ? (
            <DoneButton title={t("CompleteSet")} 
            fontSize={17}
            onPress={handleCompleteSet} />
          ) : (
            <DoneButton title={t("CompleteExc")}
            fontSize={13}
             onPress={() => setModalVisible(true)} />
          ))}
        {isResting && <RestButton title={t("SkipRest")} onPress={() => setIsResting(false)} />}
        <CancelButton title={t("ResetWorkout")} onPress={handleResetWorkout} />
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
};


export default UpperBodyScreen;



