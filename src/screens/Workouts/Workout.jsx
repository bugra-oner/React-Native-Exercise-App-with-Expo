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
  sit_ups: require('../../assets/animations/sit_ups_animation.json'),
  triceps_dips: require('../../assets/animations/triceps_dips'),
  squats: require('../../assets/animations/squad_animation.json'),
};

let fullBodyWorkout = {
  "HomeFullBodyWorkout": {
    completedCount: 0,
    level: 1,
  },
};

const WorkoutScreen = ({navigation}) => {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercises, setExercises] = useState(ExerciseService.getExercises());
  const [exerciseReps, setExerciseReps] = useState(ExerciseService.increaseRepsByLevel(exercises[0], level));
  const [totalReps, setTotalReps] = useState(0);

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
      const storedStatus = await AsyncStorage.getItem('@fullBodyWorkoutStatus');
      console.log(storedStatus)
          if (storedStatus === null) {
            console.log('test1 ')
        await AsyncStorage.setItem('@fullBodyWorkoutStatus', JSON.stringify({}));
      } else {
        console.log('test2 ')
        const fullBodyWorkoutStatusData = JSON.parse(storedStatus)
        console.log(fullBodyWorkoutStatusData,'test 2')
        const currentLevel = fullBodyWorkoutStatusData['HomeFullBodyWorkout']?.level || 1;
        setLevel(currentLevel);
        // const completedExerciseStats = fullBodyWorkout[exercises[exerciseIndex].name];
        // // if (completedExerciseStats) {
        // //   setTotalReps(completedExerciseStats.totalReps);
        // // }
      }
      
      const savedExerciseIndex = await AsyncStorage.getItem('@exerciseIndex');
      const savedCurrentSet = await AsyncStorage.getItem('@currentSet');
      // const savedTotalReps = await AsyncStorage.getItem('@totalReps');
      // setLevel(fullBodyWorkout['HomeFullBodyWorkout'].level);
      if (savedExerciseIndex) setExerciseIndex(JSON.parse(savedExerciseIndex));
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
      // if (savedTotalReps) setTotalReps(JSON.parse(savedTotalReps));
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@fullBodyWorkoutStatus', JSON.stringify({
        'HomeFullBodyWorkout' : {level}
      }));
      await AsyncStorage.setItem('@exerciseIndex', JSON.stringify(exerciseIndex));
      await AsyncStorage.setItem('@currentSet', JSON.stringify(currentSet));
      //await AsyncStorage.setItem('@totalReps', JSON.stringify(totalReps));
    } catch (error) {
      console.error(error);
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
        handleCompleteWorkout();
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
    const completedExerciseStats = fullBodyWorkout[completedExerciseName] || { completedCount: 0, totalReps: 0,  };
    completedExerciseStats.completedCount += 1;
    completedExerciseStats.totalReps += repsInThisSet;
    
    fullBodyWorkout[completedExerciseName] = completedExerciseStats;

    // Hafızada güncellenen istatistikleri sakla
    try {
      await AsyncStorage.setItem('@fullBodyWorkoutStatus', JSON.stringify(fullBodyWorkout));
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetWorkout = () => {
    setExerciseIndex(0);
    setCurrentSet(1);
    setRestTime(0);
    setIsResting(false);
    // setTotalReps(0);
  };

  const handleCompleteWorkout = () => {
    Alert.alert(
      'Workout Completed',
      'How did you find the workout?',
      [
        {
          text: 'It was easy for me',
          onPress: async () => {
            fullBodyWorkout['HomeFullBodyWorkout'].completedCount += 1;
            fullBodyWorkout['HomeFullBodyWorkout'].level = level + 1;
            await AsyncStorage.setItem('@fullBodyWorkoutStatus', JSON.stringify(fullBodyWorkout));
            setLevel(level + 1);
            handleResetWorkout();
          }
        },
        {
        text: 'It was just right',
          onPress: async () => {
            fullBodyWorkout['HomeFullBodyWorkout'].completedCount += 1;
            await AsyncStorage.setItem('@fullBodyWorkoutStatus', JSON.stringify(fullBodyWorkout));
            handleResetWorkout();
          }
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const exercise = exercises[exerciseIndex];

  const {t} = useTranslation();

  return (
    <>
    <Header  
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        DefaultColor='#283048'
       LeftIconOnPress={()=> navigation.goBack()}
       RightIcon='atom-variant'
      title={t('FullBodyWorkout')}/>
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
      <LottieView source={animations[exercise.image]} autoPlay loop style={styles.image} 
        
      />
      <ProgressBar progress={currentSet / exercise.sets} color="#00ff00" />
      {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}
      
      <View style={styles.buttonContainer}>
      {!isResting &&
        (exerciseIndex < exercises.length - 1 || currentSet < exercises[exerciseIndex].sets ?
          <DoneButton title={t("CompleteSet")}  onPress={handleCompleteSet} /> :
          <DoneButton title={t("CompleteExc")}   onPress={handleCompleteWorkout} />
        )
      }
      {isResting && <RestButton title={t("SkipRest")} onPress={() => setIsResting(false)} />}
      <CancelButton  style={styles.button} title={t("ResetWorkout")} onPress={handleResetWorkout} />
    </View>
      
      </LinearView>
      </>
    
  );
}

export default WorkoutScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#ffffff',
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical :"8%"
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





