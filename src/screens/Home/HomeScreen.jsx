import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image } from 'react-native';
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
import Header from '../../components/views/Header';
import ImageCard from '../../components/Cards/ImageCard';
import ProteinCard from '../../components/Cards/ProteinCard';
import SingleWorkoutCard from '../../components/SingleWorkoutCard';

export default function HomeScreen({navigation}) {

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
    <>
    <Header title={t("Homepage")}  
    LeftIcon='weight-lifter'
    LeftIconOnPress={() => navigation.navigate('Workouts')}
    RightIcon='home'
    RightIconOnPress={() => navigation.navigate("Profil")}
      
    />
    <ScrollView style={styles.container}>
      <CreaterCard
      marginTop="10%" 
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
          image="sit_ups"
          buttonText={t('Start')}
        />
         <WorkoutsCard 
          title={t('LowerBodyWorkout')}
          subTitle={t('LowerBodyDesc')}
          onPress={() => navigate('LowerBody')}
          image="squats"
          buttonText={t('Start')}
        />
      </View>
        {/* <Text style={styles.Foods}>
        {t('Foods')}
      </Text> 
       <View style={styles.ProteinCardView}>
      <ProteinCard />
      </View>  */}
      <ProteinCard />
      <Text style={styles.singleExercisesTitle}>Single Exercises</Text>
      <View>
        <View style={styles.singleExerciseView}>
      <View style={styles.singleExercisesRow}>
        <SingleWorkoutCard 
      title={t('PushUps')}
      description={t('PushupDesc')}
      imageSource={require('../../assets/cards/pushups.jpg')}
      onPress={() => navigate('PushUps')}
        />
        <SingleWorkoutCard 
      title={t('Squad')}
      description={t('SquadDesc')}
      imageSource={require('../../assets//cards/triceps.jpg')}
      onPress={() => navigate('Squad')}
        />
       </View>
        <View style={styles.singleExercisesRow}>
        <SingleWorkoutCard 
      title={t('SitUps')}
      description={t('SitupsDesc')}
      imageSource={require('../../assets/cards/situps.jpg')}
      onPress={()=> navigate('SitUps')}
       />
        <SingleWorkoutCard 
      title={t('TricepsDips')}
      description={t('TricepsDesc')}
      imageSource={require('../../assets//cards/triceps.jpg')}
      onPress={() => navigate('Triceps')}
      />
      </View>
  </View>
</View>

      <View style={styles.ExtraView}>
      </View>
    </ScrollView> 
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor : 'white'
  },
  title:{
    marginLeft: '5%',
    marginTop: 15,
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
    height : '15',
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
      marginVertical: 20,
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
    ExtraView:{
     height: 200,
    },
    proteinBarImage:{
      width: 100,
      height: 100,
      alignSelf: "center",
      borderRadius: 50,
    },
    singleExercisesTitle:{
      marginLeft: '5%',
      fontSize: typography.title,
      color: colors.UiText,
      fontWeight: '900',
      marginVertical: 5,
    },
    singleExerciseView:{
      alignItems : 'center',
    },
    singleExercises:{
      justifyContent: 'center',
      backgroundColor : 'red',
    },
    singleExercisesRow:{
      flexDirection: 'row',
      columnGap : 5,
      marginVertical: 10,
    }
    
})

