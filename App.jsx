// App.js

import React,{useEffect, useState} from 'react';
import BottomStackNavigator from './src/navigation/BottomNavigation';
import { SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import  {navigationRef} from './src/navigation/navigationRef'


import * as Font from "expo-font";

import { I18nextProvider } from 'react-i18next';
import i18n,{useSetLanguage} from './src/i18n/i18n';





export default function App() {
  const isLanguageLoaded = useSetLanguage();
  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      // Burada kullanmak istediğiniz fontları yükleyebilirsiniz
      'Gilroy-Bold': require('../for-better/src/assets/fonts/Gilroy-Bold.ttf'),
      'Gilroy-Medium': require('../for-better/src/assets/fonts/Gilroy-Medium.ttf'),
      'Gilroy-SemiBold': require('../for-better/src/assets/fonts/Gilroy-SemiBold.ttf'),
      // Diğer fontları da buraya ekleyebilirsiniz
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

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
     </SafeAreaView>
         </I18nextProvider>
  );
}


