// Localization.js
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../locales/en.json';
import tr from '../locales/tr.json';

// Set the supported languages and their translations
i18n.translations = {
  en,
  tr,
};

// Set the default language
i18n.locale = Localization.locale;

// Set the fallback language in case the current locale is not supported
i18n.fallbacks = true;

export default i18n;


