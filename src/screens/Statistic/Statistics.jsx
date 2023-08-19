import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WorkoutsCard from '../../components/Cards/WorkoutsCard';

import colors from '../../constants/colors';
import { useTranslation } from 'react-i18next';
import CreaterCard from '../../components/Cards/CreateCard';
import Header from '../../components/views/Header';

const StatisticsScreen = ({navigation}) => {
   const {t, i18n } = useTranslation();
  const [fullBodyWorkoutStats, setFullBodyWorkoutStats] = useState(null);
  const [upperBodyWorkoutStats, setUpperBodyWorkoutStats] = useState(null);
  const [lowerBodyWorkoutStats, setLowerBodyWorkoutStats] = useState(null);

  useEffect(() => {
    getStatistics();
  }, []);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header title={t('WorkoutStatistics')} 
    LeftIcon='weight-lifter'
    RightIconOnPress={() => navigation.navigate("Profil")}
    />
    <ScrollView style={styles.container}>
    <View style={styles.center}>
      <Text style={styles.subTitle}>{t('ExercisesWithoutEquipment')}</Text>
      {fullBodyWorkoutStats && (
      <WorkoutsCard
        title={t('FullBodyWorkout')}
        subTitle={i18n.t('FullBodyDesc')}
        level={fullBodyWorkoutStats.HomeFullBodyWorkout?.level || 1} 
        />
    )}
    {upperBodyWorkoutStats && (
      <WorkoutsCard
      title={t('UpperBodyWorkout')} 
      subTitle={i18n.t('UpperBodyDesc')}
      level={upperBodyWorkoutStats.UpperBodyWorkout?.level || 1} 
      />
    )}
    {lowerBodyWorkoutStats &&(
      <WorkoutsCard
      title={t('LowerBodyWorkout')}
      level={lowerBodyWorkoutStats.HomeLowerBodyWorkout.level || 1}
      subTitle={i18n.t('LowerBodyDesc')}
           />
    )}
    <CreaterCard 
      marginTop="6%"
      height= "25%"
    />
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
    flex: 1,
    alignItems: "center"
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
  }
});

export default StatisticsScreen;




