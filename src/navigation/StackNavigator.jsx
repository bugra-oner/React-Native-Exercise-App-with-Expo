import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Workout from '../screens/Workout'

const Stack = createNativeStackNavigator();


export default function StackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Workout" component={Workout}/>
    </Stack.Navigator> 
    </NavigationContainer>
  )
}
