import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Dil dosyalarını içe aktar
const en = require('./locales/en.json');
const tr = require('./locales/tr.json');

i18n.translations = {
  en,
  tr,
};

// Cihazın dil ayarını al
const locale = Localization.locale.split('-')[0];
i18n.locale = locale;
i18n.fallbacks = true;

export default i18n;



