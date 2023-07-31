// screens/HomeScreen.js
import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Button title="Start Workout" onPress={() => navigation.navigate('LevelSelector')} />
      <Button title="Workout History" onPress={() => navigation.navigate('History')} />
    </View>
  );
}
