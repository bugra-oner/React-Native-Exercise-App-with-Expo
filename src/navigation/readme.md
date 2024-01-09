# Navigation

The `navigation` folder plays a crucial role in defining and managing the navigation flow of your React Native application. Here's a breakdown of its components:

## `BottomStackNavigator.js`

This file sets up the bottom tab navigation using the `createBottomTabNavigator` from `@react-navigation/bottom-tabs`. It typically includes screens like Home, Profile, Settings, etc.

Example usage:

```jsx
// Import necessary dependencies
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// Define the BottomStackNavigator component
const BottomStackNavigator = () => {
  return (
    <Tab.Navigator>
      {/* Define tab screens */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomStackNavigator;



StackScreens
In the StackScreens folder, individual stack navigators are defined for specific sections or features of your app, such as authentication, onboarding, or detailed views.

Example usage:

// Import necessary dependencies
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Create a stack navigator
const AuthStack = createStackNavigator();

// Define the AuthStackNavigator component
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      {/* Define stack screens */}
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export { AuthStackNavigator };



Integration in App.js
Finally, integrate these navigators in your App.js:


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomStackNavigator } from './navigation/BottomStackNavigator';
import { AuthStackNavigator } from './navigation/StackScreens/AuthStackNavigator';

const App = () => {
  // ... Other app setup

  return (
    <NavigationContainer>
      {/* Use conditional rendering based on authentication status */}
      {isLoggedIn ? <BottomStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default App;

This setup allows you to have a clear and organized navigation structure in your React Native app.


