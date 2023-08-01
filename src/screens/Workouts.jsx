import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Workouts({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Workout</Text>
      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('LevelSelector')}
        >
          <Text style={styles.cardTitle}>Workout 1</Text>
          <Text style={styles.cardDescription}>Description of Workout 1 goes here...</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('LevelSelector')}
        >
          <Text style={styles.cardTitle}>Workout 2</Text>
          <Text style={styles.cardDescription}>Description of Workout 2 goes here...</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('LevelSelector')}
        >
          <Text style={styles.cardTitle}>Workout 3</Text>
          <Text style={styles.cardDescription}>Description of Workout 3 goes here...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
  },
});