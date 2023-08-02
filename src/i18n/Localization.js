import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

const translations = {
  en: require('../locales/en.json'),
  tr: require('../locales/tr.json'),
};

const LANGUAGE_KEY = 'selectedLanguage';

const getDefaultLocale = () => {
  // Use the primary language code from Expo's Localization.locale as the default language
  const locale = Localization.locale.split('-')[0];
  return locale;
};

const getCurrentLocale = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (storedLanguage) {
      return storedLanguage;
    } else {
      return getDefaultLocale();
    }
  } catch (error) {
    console.log('Error getting current locale:', error);
    // If there's an error, fallback to using the primary language code from Expo's Localization.locale
    return getDefaultLocale();
  }
};

const setStoredLanguage = async (value) => {
  try {
    if (value) {
      await AsyncStorage.setItem(LANGUAGE_KEY, value);
    } else {
      await AsyncStorage.removeItem(LANGUAGE_KEY);
    }
  } catch (error) {
    console.log('Error storing language:', error);
  }
};

const translate = (key, fallback) => {
  const locale = getDefaultLocale();
  const translation = translations[locale]?.[key];

  if (translation) {
    return translation;
  } else {
    console.log(`Translation not found for key: '${key}' in locale: '${locale}'`);
    return fallback;
  }
};

export { getCurrentLocale, setStoredLanguage, translate };






