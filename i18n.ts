import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, ar} from './src/constants/translations'; // Assuming these are your translation objects
import AsyncStorage from '@react-native-async-storage/async-storage';
import {I18nManager} from 'react-native';

// Define a type for the language code

// Define the structure of the translation files
interface Translations {
  [key: string]: string;
}

// Define the AsyncStorage key constant for language
const STORE_LANGUAGE_KEY = 'settings.lang';

interface LanguageDetectorPlugin {
  type: 'languageDetector';
  async: true;
  init: () => void;
  detect: (callback: (lang: string) => void) => void;
  cacheUserLanguage: (language: string) => void;
}

const languageDetectorPlugin: LanguageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async callback => {
    try {
      // Get stored language from AsyncStorage
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          // If language was stored before, use it in the app
          return callback(language as string); // Cast it to LanguageCode type
        } else {
          // If language was not stored yet, default to 'en'
          return callback('en');
        }
      });
    } catch (error) {
      console.error('Error reading language', error);
      callback('en'); // Fallback to 'en' in case of error
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      // Save the user's language choice in AsyncStorage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
      if (language === 'ar') {
        I18nManager.forceRTL(true); // Force RTL layout
        I18nManager.allowRTL(true); // Allow RTL layout
      } else {
        I18nManager.forceRTL(false); // Force LTR layout
        I18nManager.allowRTL(false); // Allow LTR layout
      }
    } catch (error) {
      console.error('Error saving language', error);
    }
  },
};

// Define the resources structure for i18n
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

// Define i18next initialization options with types
const i18nOptions: InitOptions = {
  resources,
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
};

// Initialize i18next with the necessary configurations
i18n
  .use(initReactI18next) // Use the React I18next integration
  .use(languageDetectorPlugin) // Use the language detector plugin
  .init(i18nOptions); // Pass in the configuration options

export default i18n;
