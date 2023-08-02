import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import {useTranslation} from 'react-i18next';


export default function Home({ navigation }) {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("home")}</Text>
      <Text style={styles.subtitle}>{t("homeSubtitle")}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Workouts')}
      >
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity 
       style={styles.button}
       onPress={() => navigation.navigate('Statistic')}>
       <Text style={styles.buttonText}>
       İstatistik
       </Text> 
       </TouchableOpacity>
       <TouchableOpacity 
       style={styles.button}
       onPress={() => navigation.navigate('TestScreen')}>
       <Text style={styles.buttonText}>
       Test
       </Text> 
       </TouchableOpacity>
       <TouchableOpacity 
       style={styles.button}
       onPress={() => navigation.navigate('Settings')}>
       <Text style={styles.buttonText}>
       Ayarlar
       </Text> 
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

