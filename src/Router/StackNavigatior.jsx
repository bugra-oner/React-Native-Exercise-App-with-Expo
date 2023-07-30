import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';

const Stack = createNativeStackNavigator;

export default function StackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Text>asdfasdf</Text>
    </Stack.Navigator> 
    </NavigationContainer>
  )
}
