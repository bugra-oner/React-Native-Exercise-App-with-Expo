import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { setStoredLanguage, getCurrentLocale } from '../i18n/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'selectedLanguage';

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      setSelectedLanguage(storedLanguage || await getCurrentLocale());
    };

    loadLanguage();
  }, []);

  const handleLanguageChange = async (language) => {
    await setStoredLanguage(language);
    setSelectedLanguage(language);
  };

  const handleRestoreLanguage = async () => {
    await AsyncStorage.removeItem(LANGUAGE_KEY);
    setSelectedLanguage(await getCurrentLocale());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      <TouchableOpacity
        style={[styles.button, selectedLanguage === 'en' && styles.selectedButton]}
        onPress={() => handleLanguageChange('en')}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedLanguage === 'tr' && styles.selectedButton]}
        onPress={() => handleLanguageChange('tr')}
      >
        <Text style={styles.buttonText}>Türkçe</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.restoreButton}
        onPress={handleRestoreLanguage}
      >
        <Text style={styles.buttonText}>Restore System Language</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#2980b9',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  restoreButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
});

export default LanguageScreen;




