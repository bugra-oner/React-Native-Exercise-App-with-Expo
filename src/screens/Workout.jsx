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
    getDataFromAsyncStorage();
  }, []);

  useEffect(() => {
    increaseSetsAndUpdateAsyncStorage();
  }, [level, currentExercise, currentSet, sets]);

  const getDataFromAsyncStorage = async () => {
    try {
      const level = await AsyncStorage.getItem('@level');
      const currentExercise = await AsyncStorage.getItem('@currentExercise');
      const currentSet = await AsyncStorage.getItem('@currentSet');
      const sets = await AsyncStorage.getItem('@sets');

      if (level) setLevel(JSON.parse(level));
      if (currentExercise) setCurrentExercise(JSON.parse(currentExercise));
      if (currentSet) setCurrentSet(JSON.parse(currentSet));
      if (sets) setSets(JSON.parse(sets));
    } catch (error) {
      console.error(error);
    }
  };

  const increaseSetsAndUpdateAsyncStorage = async () => {
    let newSets = [...sets];
    if (level > 1) {
      newSets = sets.map(set => set + level);
    }

    storeData('level', level);
    storeData('currentExercise', currentExercise);
    storeData('currentSet', currentSet);
    storeData('sets', newSets);

    if(level > 1) {
        setSets(newSets);
    }
};


  const completeSet = async () => {
    console.log("test")
    if (currentSet < sets.length - 1) {
      setCurrentSet(currentSet + 1);
    } else {
      if (currentExercise < exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setCurrentSet(0);
      } else {
        // Egzersizler bitti, level artırılıyor
        setLevel(level + 1);
        setSets(baseSets.map((set) => set * (level + 1)));
        setCurrentSet(0);
        setCurrentExercise(0);
      }
    }
  };

  const reset = async () => {
    setLevel(1);
    setSets(baseSets.map((set) => set));
    setCurrentSet(0);
    setCurrentExercise(0);
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem('@' + key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout App</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Current Level: {level}</Text>
        <Text style={styles.text}>Current Exercise: {exercises[currentExercise]}</Text>
        <Text style={styles.text}>Sets: {sets.join(',')}</Text>
      </View>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{sets[currentSet]}</Text>
      </View>
      <View style={styles.buttonContainer}>
          <Pressable onPress={() => {console.log('complete set pressed'); completeSet();}} style={styles.button}>
                <Text style={styles.buttonText}>Complete Set</Text>
            </Pressable>
            <Pressable onPress={() => {console.log('reset pressed'); reset();}} style={styles.button}>
                <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  circleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Workout;

