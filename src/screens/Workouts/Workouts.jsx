import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors'
import typography from '../../constants/typography'

import WorkoutsCard from '../../components/Cards/WorkoutsCard';
import CreaterCard from '../../components/Cards/CreateCard';
import i18n from '../../i18n/i18n';
import { navigate } from '../../navigation/navigationRef';

import { useTranslation } from 'react-i18next';
import Header from '../../components/views/Header';

export default function Workouts() {
  const { t, i18n } = useTranslation();
  return (
    <>
    <Header />
    <View style={styles.container}>
    <View style={styles.topHeader}>
    <Text style={styles.title}>{i18n.t('ExercisesWithoutEquipment')}</Text>
    <Text style={styles.subTitle}>{i18n.t('All')}</Text>
    </View>
      <View style={styles.cardsContainer}>
        <WorkoutsCard 
          title={i18n.t('FullBodyWorkout')}
          subTitle={i18n.t('FullBodyDesc')}
          onPress={() => navigate('Workout')}
          image="push_ups"
          buttonText={t('Start')}
        />
         <WorkoutsCard 
          title= {i18n.t('UpperBodyWorkout')}
          subTitle={i18n.t('UpperBodyDesc')}
          image="push_ups"
          buttonText={t('Start')}
          onPress={() => navigate('UpperBody')}
          />
         <WorkoutsCard 
          title={i18n.t('LowerBodyWorkout')}
          subTitle={i18n.t('LowerBodyDesc')}
          onPress={() => navigate('LowerBody')}
          image="push_ups"
          buttonText={t('Start')}
        />
      </View>
    </View>
    </>
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
