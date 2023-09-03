import React, { useEffect, useState, useTransition } from 'react';
import { Alert, View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import ExerciseService from '../../service/ExerciseService';
import LinearView from '../../components/views/LinearView';

import LottieView from 'lottie-react-native';

import Header from '../../components/views/Header';

import RestButton from '../../components/buttons/RestButton';
import CancelButton from '../../components/buttons/CancelButton';
import DoneButton from '../../components/buttons/DoneButton';

import WorkoutCompletionModal from '../../components/modals/WorkoutModals';

import { useTranslation } from 'react-i18next'

const animations = {
  Squad: require('../../assets/animations/squad_animation.json'),
  SingleLeg: require('../../assets/animations/singleLed.json'),
  Lunges: require('../../assets/animations/lunges.json'),
  //asdf: require('../../assets/squats.png'),
};

let LowerBodyWorkout = {
  "HomeLowerBodyWorkout": {
    completedCount: 0,
    level: 1,
  },
};

const LowerBody = ({navigation}) => {
  const {t} = useTranslation();

  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [exercises, setExercises] = useState(ExerciseService.getLowerBodyExercises());
  const [exerciseReps, setExerciseReps] = useState(ExerciseService.increaseRepsByLevel(exercises[0], level));
  const [totalReps, setTotalReps] = useState(0);
  const [modalVisible,setModalVisible] = useState(false);


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
      const storedStatus = await AsyncStorage.getItem('@LowerBodyWorkoutStatus');
       //console.log(storedStatus)
          if (storedStatus === null) {
            //console.log('test1 ')
        await AsyncStorage.setItem('@LowerBodyWorkoutStatus', JSON.stringify({}));
      } else {
         //console.log('test2 ')
        const LowerBodyWorkoutData = JSON.parse(storedStatus)
         //console.log(LowerBodyWorkoutData,'test 2')
        const currentLevel = LowerBodyWorkoutData['HomeLowerBodyWorkout']?.level || 1;
        setLevel(currentLevel);
        // const completedExerciseStats = LowerBodyWorkout[exercises[exerciseIndex].name];
        // // if (completedExerciseStats) {
        // //   setTotalReps(completedExerciseStats.totalReps);
        // // }
      }
      
      const savedExerciseIndex = await AsyncStorage.getItem('@exerciseIndex');
      const savedCurrentSet = await AsyncStorage.getItem('@currentSet');
      // const savedTotalReps = await AsyncStorage.getItem('@totalReps');
      // setLevel(LowerBodyWorkout['HomeLowerBodyWorkout'].level);
      if (savedExerciseIndex) setExerciseIndex(JSON.parse(savedExerciseIndex));
      if (savedCurrentSet) setCurrentSet(JSON.parse(savedCurrentSet));
      // if (savedTotalReps) setTotalReps(JSON.parse(savedTotalReps));
    } catch (error) {
      console.error(error);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@LowerBodyWorkoutStatus', JSON.stringify({
        'HomeLowerBodyWorkout' : {level}
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
        // handleCompleteWorkout();
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
    const completedExerciseStats = LowerBodyWorkout[completedExerciseName] || { completedCount: 0, totalReps: 0,  };
    completedExerciseStats.completedCount += 1;
    completedExerciseStats.totalReps += repsInThisSet;
    
    LowerBodyWorkout[completedExerciseName] = completedExerciseStats;

    // Hafızada güncellenen istatistikleri sakla
    try {
      await AsyncStorage.setItem('@LowerBodyWorkoutStatus', JSON.stringify(LowerBodyWorkout));
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

  const handleStayLevel =  async () => {
    //console.log("Stay Level")
            LowerBodyWorkout['HomeLowerBodyWorkout'].completedCount += 1;
            LowerBodyWorkout['HomeLowerBodyWorkout'].level = level + 1;
            await AsyncStorage.setItem('@LowerBodyWorkoutStatus', JSON.stringify(LowerBodyWorkout));
            setLevel(level + 1);
            handleResetWorkout();
            setModalVisible(false);
  }

  const handleLevelUp =  async () => {
    //console.log("Handle Level Up");
            LowerBodyWorkout['HomeLowerBodyWorkout'].completedCount += 1;
            await AsyncStorage.setItem('@LowerBodyWorkoutStatus', JSON.stringify(LowerBodyWorkout));
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
  //           LowerBodyWorkout['HomeLowerBodyWorkout'].completedCount += 1;
  //           LowerBodyWorkout['HomeLowerBodyWorkout'].level = level + 1;
  //           await AsyncStorage.setItem('@LowerBodyWorkoutStatus', JSON.stringify(LowerBodyWorkout));
  //           setLevel(level + 1);
  //           handleResetWorkout();
  //         }
  //       },
  //       {
  //       text: 'It was just right',
  //         onPress: async () => {
  //           LowerBodyWorkout['HomeLowerBodyWorkout'].completedCount += 1;
  //           await AsyncStorage.setItem('@LowerBodyWorkoutStatus', JSON.stringify(LowerBodyWorkout));
  //           handleResetWorkout();
  //         }
  //       },
  //       {text: 'Cancel', style: 'cancel'},
  //     ],
  //     {cancelable: true},
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
  title={t('Workout')}/>
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
      <LottieView source={animations[exercise.image]} autoPlay loop style={styles.image} />
      <ProgressBar progress={currentSet / exercise.sets} color="#00ff00" />
      {isResting && <Text style={styles.restTimeText}>Rest Time: {restTime}</Text>}
      
      <View style={styles.buttonContainer}>
      {!isResting &&
        (exerciseIndex < exercises.length - 1 || currentSet < exercises[exerciseIndex].sets ?
          <DoneButton title={t("CompleteSet")} onPress={handleCompleteSet} /> :
          <DoneButton title={t("CompleteExc")} onPress={() => setModalVisible(true)} />
        )
      }
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
}

export default LowerBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  setsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  setTextContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  activeSetContainer: {
    backgroundColor: '#d35400',
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
    color: '#fff',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical : 20,
  },
});