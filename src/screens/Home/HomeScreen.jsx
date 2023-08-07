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

export default function HomeScreen() {
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

  const calculateStatistics = () => {
    const { totalWorkouts, totalReps } = ExerciseService.calculateStatistics();
    setTotalWorkouts(totalWorkouts);
    setTotalReps(totalReps);
  };

  useEffect(() => {
    const { totalWorkouts, totalReps } = ExerciseService.calculateStatistics();
    setTotalWorkouts(totalWorkouts);
    setTotalReps(totalReps);

    loadLevels();
    calculateStatistics();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <CreaterCard  onPress={() => navigate('Workouts')}
      />
      <Text style={styles.title}>Genel Bakış</Text>
      <View style={styles.headerContainer}>
        <SvgCard title="Tamamlanan" subTitle={`${totalWorkouts} Antrenman`} />
        <View style={styles.buttonsContainer}>
        <ButtonCard  
        onPress={() => console.log('test')}
        title="Program" subTitle={`${totalReps} Egzersiz`} />
        <Spacing 
          size={15}
        />
        <ButtonCard  
          onPress={()=> console.log("test")}
        title="Toplam" subTitle=" 360 tekrar" />
        </View>
      </View>
      <View style={styles.cardsContainer}>
      <View style={styles.workoutsHeader}>
      <Text style={styles.workoutsTitle}>Ekipmansız Egzersizler</Text>
      <TouchableOpacity
      onPress={() => navigate('Workouts')}>
      <Text style={styles.workoutsSubTitle}>Tümü</Text>
      </TouchableOpacity>
       </View>
        <WorkoutsCard 
          title="Tüm Vücut Antrenmanı"
          subTitle="Tüm büyük kas gruplarını çalıştırarak genel kondisyonu ve vücut şeklini geliştirir."
          onPress={null}
          image="push_ups"
          buttonText="Başla"
        />
         <WorkoutsCard 
          title="Üst Vücut antremanı"
          subTitle="Göğüs, omuz, sırt ve kolları hedefler. Kasları güçlendirir, duruşu düzeltir ve üst vücudu şekillendirir."
          onPress={null}
          image="push_ups"
          buttonText="Başla"
        />
         <WorkoutsCard 
          title="Alt Vücut Antrenmanı"
          subTitle="Bacak, kalça ve alt karın bölgelerini hedefler. Dengeyi artırır, bacak kaslarını güçlendirir ve alt vücudu şekillendirir."
          onPress={null}
          image="push_ups"
          buttonText="Başla"
        />
      </View>
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
})

