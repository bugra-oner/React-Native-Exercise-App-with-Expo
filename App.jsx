// App.js

import React,{useEffect, useState} from 'react';
import BottomStackNavigator from './src/navigation/BottomNavigation';
import { SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

import  {navigationRef} from './src/navigation/navigationRef'


import { I18nextProvider } from 'react-i18next';
import i18n,{useSetLanguage} from './src/i18n/i18n';

import FlashMessage from 'react-native-flash-message';

export default function App() {
  const isLanguageLoaded = useSetLanguage();
 


  if(!isLanguageLoaded){
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white' }}>
    <NavigationContainer
     ref={navigationRef}>
     <BottomStackNavigator />
     </NavigationContainer>
     <FlashMessage position="top" />
     </SafeAreaView>
         </I18nextProvider>
  );
}


