import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native';
import ExerciseService from '../../service/ExerciseService';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Spacing from '../../components/views/Spacing';

import CreaterCard from '../../components/Cards/CreateCard';
import SvgCard from '../../components/Cards/SvgCard';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import ButtonCard from '../../components/Cards/ButtonCard';
import IndexCard from '../../components/Cards/IndexCard'
import WorkoutsCard from '../../components/Cards/WorkoutsCard';
import { navigate } from '../../navigation/navigationRef';


import { useTranslation } from 'react-i18next';

export default function HomeScreen() {

  const { t, i18n } = useTranslation();

  const [completedWorkouts,setCompletedWorkouts] = useState(0);
  const [level, setLevel] = useState(1);
  const [workout2Level, setWorkout2Level] = useState(1);
  const [workout3Level, setWorkout3Level] = useState(1);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalReps, setTotalReps] = useState(0);

  

  const loadLevels = async () => {
    const level = await ExerciseService.getLevel('@save_level');
    const workout2Level = await ExerciseService.getLevel('@save_workout2Level');
    const workout3Level = await ExerciseService.getLevel('@save_workout3Level');
    setLevel(level);
    setWorkout2Level(workout2Level);
    setWorkout3Level(workout3Level);
  };

  // const calculateStatistics = () => {
  //   const { totalWorkouts, totalReps } = ExerciseService.calculateStatistics();
  //   setTotalWorkouts(totalWorkouts);
  //   setTotalReps(totalReps);
  // };

  useEffect(() => {
    const { totalWorkouts, totalReps } = ExerciseService.calculateStatistics();
    setTotalWorkouts(totalWorkouts);
    setTotalReps(totalReps);
    loadLevels();
    // calculateStatistics();
  }, []);

  const loadData = async () => {}
  
  return (
    <ScrollView style={styles.container}>
      <CreaterCard
      marginTop="19%" 
      onPress={() => navigate('Workouts')}
      />
      <Text style={styles.title}>{t('Overview')}</Text>
      <View style={styles.headerContainer}>
        <SvgCard title={t('Completed')} subTitle={`${totalWorkouts}` + "" + t('Exercise')} />
        <View style={styles.buttonsContainer}>
        <ButtonCard  
        onPress={() => console.log('test')}
        title="Program" subTitle={"3" + " " + t(`Exercise`)} />
        <Spacing 
          size={15}
        />
        <ButtonCard  
          onPress={()=> console.log("test")}
        title={t('Total')} subTitle=" 360 tekrar" />
        </View>
      </View>
      <View style={styles.cardsContainer}>
      <View style={styles.workoutsHeader}>
      <Text style={styles.workoutsTitle}>{t('ExercisesWithoutEquipment')}</Text>
      <TouchableOpacity
      onPress={() => navigate('Workouts')}>
      <Text style={styles.workoutsSubTitle}>{t('All')}</Text>
      </TouchableOpacity>
       </View>
        <WorkoutsCard 
          title={t('FullBodyWorkout')}
          subTitle={t('FullBodyDesc')}
          onPress={() => navigate('Workout')}
          image="push_ups"
          buttonText={t('Start')}
        />
         <WorkoutsCard 
          title={t('UpperBodyWorkout')}
          subTitle={t('UpperBodyDesc')}
          onPress={() => navigate('UpperBody')}
          image="push_ups"
          buttonText={t('Start')}
        />
         <WorkoutsCard 
          title={t('LowerBodyWorkout')}
          subTitle={t('LowerBodyDesc')}
          onPress={null}
          image="push_ups"
          buttonText={t('Start')}
        />
      </View>
      {/* <Text style={styles.Foods}>
        {t('Foods')}
      </Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor : 'white'
  },
  title:{
    marginLeft: '5%',
    marginTop: '2%',
    color: colors.UiText,
   fontSize : 15,
   fontWeight: 'bold',
  },
  headerContainer:{
    flexDirection : 'row',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent:'center',
    width: '100%',
    height : '25%',
    marginTop : "1%",
    justifyContent:'space-around'

  },
    buttonsContainer: {
      flexDirection: 'column', // Satır düzeninde sıralamak için flex yönlendirme
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    spacing: {
      height: 10, // Boşluğun genişliği
    },
    cardsContainer: {
      alignItems: 'center',
    },
    workoutsTitle:{
      fontSize: typography.title,
    color: colors.UiText,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    },
    workoutsSubTitle:{
      fontSize : typography.cardSubtitle,
      opacity : 0.8,
      color: colors.UiText,
    },
    workoutsHeader:{
      marginTop : 10,
      flexDirection: "row",
      justifyContent: 'space-between',
      width : '90%',
      alignSelf: 'center'
    },
    Foods:{
      marginLeft: '5%',
      fontSize: typography.title,
      color: colors.UiText,
      fontWeight: '900',
      marginBottom: 10,
    },
})

