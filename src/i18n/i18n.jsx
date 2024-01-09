// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';

// Import language files
import en from './locales/en.json';
import tr from './locales/tr.json';
import es from './locales/es.json';

// Custom hook to set language based on user preference
const useSetLanguage = () => {
  const [isLanguageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const setLanguage = async () => {
      let lng = await AsyncStorage.getItem('language');
      // If the language is not set, use the device's preferred language
      if (!lng) {
        lng = Localization.locale.split('-')[0];
      }
      // Change the language in i18n
      i18n.changeLanguage(lng);
      // Set language loaded flag to true
      setLanguageLoaded(true);
    };
    // Call the setLanguage function on component mount
    setLanguage();
  }, []);

  return isLanguageLoaded;
};

// Initialize i18n with resources and configuration
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      es: { translation: es },
    },
    lng: 'en', // Initial language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values, so no need for additional escaping
    },
  });

// Export the custom hook and i18n instance
export { useSetLanguage };
export default i18n;



/*
In this i18n.js file:

Language Initialization: The useSetLanguage hook initializes the language based on the user's preference stored in AsyncStorage. If not available, it defaults to the device's preferred language.

i18n Configuration: The i18n instance is configured with the specified resources (language files), initial language (lng), fallback language (fallbackLng), and interpolation options.

Export: Both the custom hook (useSetLanguage) and the configured i18n instance are exported for use in other parts of your application.

Feel free to ask if you have any questions or if you'd like further explanations!
*/




