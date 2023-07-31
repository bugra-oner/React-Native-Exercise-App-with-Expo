// screens/LevelSelector.js
import React from 'react';
import { View, Button } from 'react-native';

export default function LevelSelector({ navigation }) {
  return (
    <View>
      <Button title="Beginner" onPress={() => navigation.navigate('Workout', { level: 'beginner' })} />
      <Button title="Intermediate" onPress={() => navigation.navigate('Workout', { level: 'intermediate' })} />
      <Button title="Advanced" onPress={() => navigation.navigate('Workout', { level: 'advanced' })} />
    </View>
  );
}
