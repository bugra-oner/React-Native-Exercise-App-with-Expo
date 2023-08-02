// App.js

import React from 'react';
import BottomStackNavigator from './src/navigation/BottomNavigation';

import { NavigationContainer } from '@react-navigation/native';

import  {navigationRef} from './src/navigation/navigationRef'




import { I18nextProvider } from 'react-i18next';
import i18n,{useSetLanguage} from './src/i18n/i18n';





export default function App() {
  const isLanguageLoaded = useSetLanguage();

  if(!isLanguageLoaded){
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
    <NavigationContainer
     ref={navigationRef}
    >
     <BottomStackNavigator />
     </NavigationContainer>
    </I18nextProvider>
  );
}


