// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import LevelSelector from './src/screens/LevelSelector';
import WorkoutScreen from './src/screens/Workout';
import History from './src/screens/History';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer
    headerOptions={{
      headerShown:false,
    }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LevelSelector" component={LevelSelector} />
        <Stack.Screen 
        name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
