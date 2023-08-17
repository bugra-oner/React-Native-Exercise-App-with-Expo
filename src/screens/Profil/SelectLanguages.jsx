import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n/i18n';

import { navigate } from '../../navigation/navigationRef';
export default function Languages() {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    AsyncStorage.setItem('language', lng);
  };

  return (
    <View style={{marginTop : 50}}>
      <Button
        title="English"
        onPress={() => changeLanguage('en')}
      />
      <Button
        title="Türkçe"
        onPress={() => changeLanguage('tr')}
      />
      <Button
       title='Test Ekranı'
       onPress={() => navigate('Test')} 
       />
    </View>
  );
};