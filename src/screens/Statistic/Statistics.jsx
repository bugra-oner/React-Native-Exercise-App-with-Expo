import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutsCard from '../../components/Cards/WorkoutsCard';



import { useFocusEffect ,useIsFocused} from '@react-navigation/native';

import colors from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import CreaterCard from '../../components/Cards/CreateCard';
import Header from '../../components/views/Header';
import SingleWorkoutCard from '../../components/SingleWorkoutCard';

import { showMessage, hideMessage } from "react-native-flash-message";

const StatisticsScreen = ({navigation}) => {

  const isFocused = useIsFocused();

  //console.log("Deneme",isFocused)


  
   const {t, i18n } = useTranslation();
  const [fullBodyWorkoutStats, setFullBodyWorkoutStats] = useState(null);
  const [upperBodyWorkoutStats, setUpperBodyWorkoutStats] = useState(null);
  const [lowerBodyWorkoutStats, setLowerBodyWorkoutStats] = useState(null);
  const [squadWorkoutStats, setSquadWorkoutStats] = useState(null);
  const [tricepsWorkoutStats, setTricepsWorkoutStats] = useState(null);
  const [pushUpsWorkoutStats, setPushUpsWorkoutStats] = useState(null);
  const [sitUpsWorkoutStats, setSitUpsWorkoutStats] = useState(null);
  const [level,setLevel] = useState(null);

  

  useEffect(() => {
    getStatistics();

  }, [isFocused]);

  const getStatistics = async () => {
    
    try {
      const fullBodyStats = await AsyncStorage.getItem('@fullBodyWorkoutStatus');
      const upperBodyStats = await AsyncStorage.getItem('@upperBodyWorkoutStatus');
      const lowerBodyStats = await AsyncStorage.getItem('@LowerBodyWorkoutStatus');
     
      if (fullBodyStats) {
        const parsedFullBodyStats = JSON.parse(fullBodyStats);
        // console.log(parsedFullBodyStats);
        setFullBodyWorkoutStats(parsedFullBodyStats);
      }
      if (upperBodyStats) {
        const parsedUpperBodyStats = JSON.parse(upperBodyStats);
        setUpperBodyWorkoutStats(parsedUpperBodyStats);
      }
      if(lowerBodyStats){
        const parsedLowerBodyStats = JSON.parse(lowerBodyStats);
        setLowerBodyWorkoutStats(parsedLowerBodyStats);
        // console.log(lowerBodyWorkoutStats)
      }
      const squadStats = await AsyncStorage.getItem('@singleSquadWorkoutStatus');
      if (squadStats) {
        const parsedSquadStats = JSON.parse(squadStats);
        setSquadWorkoutStats(parsedSquadStats);
      }

      const tricepsStats = await AsyncStorage.getItem('@singleTricepsWorkoutStatus');
      if (tricepsStats) {
        const parsedTricepsStats = JSON.parse(tricepsStats);
        setTricepsWorkoutStats(parsedTricepsStats);
      }

      const pushUpsStats = await AsyncStorage.getItem('@singlePushUpWorkoutStatus');
     
      if (pushUpsStats) {
        const parsedPushUpsStats = JSON.parse(pushUpsStats);
        setPushUpsWorkoutStats(parsedPushUpsStats);
      }

      const sitUpsStats = await AsyncStorage.getItem('@singleSitUpsWorkoutStatus');
      if (sitUpsStats) {
        const parsedSitUpsStats = JSON.parse(sitUpsStats);
        setSitUpsWorkoutStats(parsedSitUpsStats);
      }
    } catch (error) {
      console.error(error);
    }
    };

  return (
    <>
    <Header title={t('WorkoutStatistics')} 
    LeftIcon='weight-lifter'
    RightIconOnPress={() => navigation.navigate("Profil")}
    LeftIconOnPress={() => navigation.navigate('Workouts')}
    />
    <ScrollView style={styles.container}>
    <View style={styles.center}>
      <Text style={styles.subTitle}>{t('ExercisesWithoutEquipment')}</Text>
      {fullBodyWorkoutStats && (
      <WorkoutsCard
        image={"push_ups"}
        title={t('FullBodyWorkout')}
        subTitle={i18n.t('FullBodyDesc')}
        level={fullBodyWorkoutStats.HomeFullBodyWorkout?.level || 1} 
        />
    )}
    {upperBodyWorkoutStats && (
      <WorkoutsCard
      image={"sit_ups"}
      title={t('UpperBodyWorkout')} 
      subTitle={i18n.t('UpperBodyDesc')}
      level={upperBodyWorkoutStats.UpperBodyWorkout?.level || 1} 
      />
    )}
    {lowerBodyWorkoutStats && (
      <WorkoutsCard
      image={"calf_raises"}
      title={t('LowerBodyWorkout')}
      level={lowerBodyWorkoutStats.HomeLowerBodyWorkout?.level || 1}
      subTitle={i18n.t('LowerBodyDesc')}
           />
    )}
    </View>
    <View>
    <Text style={styles.Header}>
      {t('SingleExercises')}
    </Text>
    <View style={styles.containerRow}>
    <View style={styles.rowContainerSingle}>
    {squadWorkoutStats && (
      <SingleWorkoutCard title={t('Squad')}
       level={squadWorkoutStats.SingleSquadWorkout?.level || 1}
       description={t('SquadDesc')}
      />)}
          {tricepsWorkoutStats && ( <SingleWorkoutCard title={t('Triceps')} 
            level={tricepsWorkoutStats.SingleTricepsWorkout?.level || 1}
            description={t('TricepsDesc')}
          />
          )}
          </View>
          <View style={styles.rowContainerSingle}>
          {pushUpsWorkoutStats && ( <SingleWorkoutCard title={t('PushUps')}  
          
           level={pushUpsWorkoutStats.SinglePushUpWorkout?.level || 1} 
           description={t('PushupDesc')}
           />)}
           
          {sitUpsWorkoutStats && (
            <SingleWorkoutCard title={t('SitUps')}
              description={t('SitupsDesc')}
            level= {sitUpsWorkoutStats.SingleSitUpsWorkout?.level || 1}
             />)}
             </View>
             </View>
             <View style={styles.bottomView}>

             
    <CreaterCard 
      marginTop="6%"
      height={140}
    />
    </View>
    </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center:{
    alignItems: "center",
   
  },
  header: {
    marginVertical: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.UiText
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle:{
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginVertical: 15,
    color: colors.UiText,
    marginLeft: 25,
    fontSize: 15,
  },
  Header:{
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginVertical: 15,
    color: colors.UiText,
    marginLeft: 25,
    fontSize: 15,
  },
  rowContainerSingle:{
    flexDirection : 'row',
    columnGap: 15,
    marginVertical: 10,
  },
  containerRow:{
    alignItems : 'center'
  },
  bottomView:{
    marginVertical: 5,
    height: 230,
  }
});

export default StatisticsScreen;




