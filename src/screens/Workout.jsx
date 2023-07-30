import React, { useState, useEffect } from 'react';
import { Text, View, Pressable ,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Her hareket için temel set sayıları
const baseSets = [2, 2, 2, 2, 2];

 //Egzersiz isimleri

 const exercises  = ["Push Ups", "Squads" , "Sit ups", "Calf Raises"]

const Workout = () => {
  const [level, setLevel] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [sets, setSets] = useState([...baseSets]);
  

  useEffect(() => {
    // Başlangıçta AsyncStorage'den verileri yükle
    getData('level').then(data => {
      if (data) setLevel(data);
    });

    getData('currentExercise').then(data => {
      if (data) setCurrentExercise(data);
    });

    getData('currentSet').then(data => {
      if (data) setCurrentSet(data);
    });

    getData('sets').then(data => {
      if (data) setSets(data);
    });
  }, []);

  useEffect(() => {
    // Seviye değiştiğinde, set sayılarını artır
    setSets(sets.map(set => set + level));
    // AsyncStorage'ye verileri kaydet
    storeData('level', level);
    storeData('currentExercise', currentExercise);
    storeData('currentSet', currentSet);
    storeData('sets', sets);
  }, [level, currentExercise, currentSet, sets]);

  const completeSet = async () => {
    try{
    console.log("boner")
    if (currentSet < sets.length - 1) {
      setCurrentSet(currentSet + 1);
    } else {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setCurrentSet(0);
      } else {
        // Egzersizler bitti, level artırılıyor
        await AsyncStorage.setItem('@level', JSON.stringify(level + 1));
        setLevel(level + 1);
        setSets(baseSets.map((set) => set * (level + 1)));
        setCurrentSet(0);
        setCurrentExercise(0);
      }
    }
} catch(error){
    console.log("boner")
}
  };

  const reset = async () => {
    try {
      await AsyncStorage.setItem('@level', JSON.stringify(1));
      setLevel(1);
      setSets(baseSets.map((set) => set));
      setCurrentSet(0);
      setCurrentExercise(0);
    } catch (error) {
      console.error(error);
    }
  };
  // Bir değeri sakla
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem('@' + key, JSON.stringify(value));
    } catch (error) {
      // Veriyi saklarken hata oluştu
      console.error(error);
    }
  };

  // Bir değeri al
  // Bir değeri al
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem('@' + key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      // Veriyi alırken hata oluştu
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{currentSet + 1}</Text>
      </View>
      <Text style={styles.text}>Current Level: {level}</Text>
      <Text style={styles.text}>Current Exercise: {exercises[currentExercise]}</Text>
      <Text style={styles.text}>Sets: {sets.join(',')}</Text>
      <Pressable onPress={completeSet} style={{padding: 10, backgroundColor: 'lightblue'}}>
            <Text>Complete Set</Text>
            </Pressable>
        <Pressable onPress={reset} style={{padding: 10, backgroundColor: 'lightblue', marginTop: 10}}>
         <Text>Reset</Text>
        </Pressable>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    circleText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    text: {
      marginBottom: 10,
    },
  });

export default Workout;
