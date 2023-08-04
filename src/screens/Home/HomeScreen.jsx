import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExerciseService from '../../service/ExerciseService';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Spacing from '../../components/views/Spacing';

import StarterCard from '../../components/Cards/StarterCard';
import SvgCard from '../../components/Cards/SvgCard';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import ButtonCard from '../../components/Cards/ButtonCard';
import IndexCard from '../../components/Cards/IndexCard'

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
    <View style={styles.container}>
      <StarterCard />
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
      <IndexCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor : 'white'
  },
  title:{
    marginLeft: '5%',
    marginTop: '3%',
   color: '#343854',
   fontSize : 17,
   fontWeight: 'bold',
  },
  headerContainer:{
    flexDirection : 'row',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent:'center',
    width: '100%',
    height : '25%',
    marginTop : "7%",

    justifyContent:'space-around'

  },
    buttonsContainer: {
      flexDirection: 'column', // Satır düzeninde sıralamak için flex yönlendirme
      justifyContent: 'space-between',
      alignItems: 'center',

       // Yatayda ve dikeyde ortalamak için
       // Sağ ve sol tarafında 10 birimlik boşluk verme
    },
    spacing: {
      height: 10, // Boşluğun genişliği
    },
})

