import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors'
import typography from '../../constants/typography'

import WorkoutsCard from '../../components/Cards/WorkoutsCard';
import CreaterCard from '../../components/Cards/CreateCard';
import i18n from '../../i18n/i18n';
import { navigate } from '../../navigation/navigationRef';

export default function Workouts() {
  return (
    <View style={styles.container}>
    <View style={styles.topHeader}>
    <Text style={styles.title}>Ekipmansız Egzersizler</Text>
    <Text style={styles.subTitle}>Tümü</Text>
    </View>
      <View style={styles.cardsContainer}>
        <WorkoutsCard 
          title="Tüm Vücut Antrenmanı"
          subTitle="Tüm büyük kas gruplarını çalıştırarak genel kondisyonu ve vücut şeklini geliştirir."
          onPress={() => navigate('Workout')}
          image="push_ups"
          buttonText="Başla"
        />
         <WorkoutsCard 
          title="Üst Vücut antremanı"
          subTitle="Göğüs, omuz, sırt ve kolları hedefler. Kasları güçlendirir, duruşu düzeltir ve üst vücudu şekillendirir."
          image="push_ups"
          buttonText="Başla"
          onPress={() => navigate('UpperBody')}
          />
         <WorkoutsCard 
          title="Alt Vücut Antrenmanı"
          subTitle="Bacak, kalça ve alt karın bölgelerini hedefler. Dengeyi artırır, bacak kaslarını güçlendirir ve alt vücudu şekillendirir."
          onPress={null}
          image="push_ups"
          buttonText="Başla"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: typography.title,
    color: colors.UiText,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle:{
    fontSize : typography.cardSubtitle,
    opacity : 0.6
  },
  cardsContainer: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 13,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: typography.title,
    color: colors.title,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: typography.body,
    color: colors.subTitle,
    fontWeight: '600',
  },
  topHeader:{
    marginTop : 50,
    flexDirection: "row",
    justifyContent: 'space-between',
    width : '90%',
    alignSelf: 'center'
  },
});
