import { useEffect, useState } from 'react';
import { View,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n/i18n';


const LANGUAGE_KEY = 'LANGUAGE_KEY';

export default function LanguageSelectScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (value !== null) {
        i18n.locale = value;
        setSelectedLanguage(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const selectLanguage = async (languageCode) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
      i18n.locale = languageCode;
      setSelectedLanguage(languageCode);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  return (
    <View>
      <Button
        title={i18n.t('english')}
        onPress={() => selectLanguage('en')}
        color={selectedLanguage === 'en' ? 'blue' : 'gray'}
      />
      <Button
        title={i18n.t('turkish')}
        onPress={() => selectLanguage('tr')}
        color={selectedLanguage === 'tr' ? 'blue' : 'gray'}
      />
    </View>
  );
}




