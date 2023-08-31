import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import { LinearGradient } from 'expo-linear-gradient';

import GradientButton from '../buttons/GradientButton';

const WorkoutCompletionModal = ({ visible, onClose, onEasy, onJustRight }) => {

  const {t} = useTranslation()


  // WorkoutCompletedTitle": "Antreman Tamamlandı",
  //     "WorkoutCompletedSubtitle": "Bu antremanı nasıl buldun?",
  //     "WorkoutEasy": "Benim için kolaydı.",
  //     "WorkoutRight": "Bu kadarı yeterli.",
  //     "Cancel": "Cancel"
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <LinearGradient 
          colors={["#2c3e50", "#484F88", "#283048"]}
          style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('WorkoutCompletedTitle')}</Text>
          <Text style={styles.modalText}>{t('WorkoutCompletedSubtitle')}</Text>
          <GradientButton 
            colors = {["#86af16", "#506272"]}
            onPress={onEasy}
            title={t('WorkoutEasy')}
            style={styles.button}
            textStyle={styles.buttonText}
          />
          <GradientButton 
            colors = {["#a0a6aa", "#334658"]}
            onPress={onJustRight}
            title={t('WorkoutRight')}
            style={styles.button} 
            textStyle={styles.buttonText}
            />
            <GradientButton 
            colors = {["#F2F2F2", "#475a6b"]}
            title={t('Cancel')}
            onPress={onClose}
            style={styles.button} 
            textStyle={styles.buttonText}
            />
            </LinearGradient>          
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: '700'
  },
  cancelButtonText: {
    backgroundColor: 'transparent',
    color: '#000',
  },
});

export default WorkoutCompletionModal;
