import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';

import en from './locales/en.json';
import tr from './locales/tr.json';

const useSetLanguage = () => {
  const [isLanguageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const setLanguage = async () => {
      let lng = await AsyncStorage.getItem('language');
      if (!lng) {
        lng = Localization.locale.split('-')[0];
      }
      i18n.changeLanguage(lng);
      setLanguageLoaded(true);
    };
    setLanguage();
  }, []);

  return isLanguageLoaded;
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export { useSetLanguage };
export default i18n;




