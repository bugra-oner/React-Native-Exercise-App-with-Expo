// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  {navigationRef} from './src/navigation/navigationRef'

import HomeScreen from './src/screens/HomeScreen';
import LevelSelector from './src/screens/LevelSelector';
import WorkoutScreen from './src/screens/Workouts/Workout';
import History from './src/screens/History';
import Workouts from './src/screens/Workouts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer
    headerOptions={{
      headerShown:false,
    }}
    ref={navigationRef}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LevelSelector" component={LevelSelector} />
        <Stack.Screen 
        name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Workouts" component={Workouts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
