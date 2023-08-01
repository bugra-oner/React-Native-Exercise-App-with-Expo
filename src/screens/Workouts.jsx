import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Workouts({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Workout</Text>
      {['Workout 1', 'Workout 2', 'Workout 3'].map(workout => (
        <TouchableOpacity 
          key={workout} 
          style={styles.button} 
          onPress={workout === 'Workout 1' ? () => navigation.navigate('LevelSelector') : null}
        >
          <Text style={styles.buttonText}>{workout}</Text>
        </TouchableOpacity>
      ))}
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
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
