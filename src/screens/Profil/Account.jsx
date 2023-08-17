import { Text, View } from 'react-native';
import React from 'react';
import SpacingButton from '../../components/buttons/SpacingButton';
import Header from '../../components/views/Header';

import styles from './styles';

export default function Account({ navigation }) {
  return (
    <>
      <Header
        title={'Kişisel Bilgiler'}
        LeftIconOnPress={() => navigation.goBack()}
        RightIconOnPress={() => navigation.navigate('Notifications')}
        LeftIcon="chevron-left"
        RightIcon="bell-outline"
        LeftIconSize={33}
      />
      <View style={styles.container}>
        <Text style={styles.HeaderText}>Profil</Text>
        <View style={styles.AccountContainer}>
          <SpacingButton
            special={true}
            specialStyle={styles.specialStyle}
            text="İsim"
            style={styles.Button}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigation.navigate('Name')}
          />
          <SpacingButton
            text="Cinsiyet"
            style={styles.LastButton}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigation.navigate('Gender')}
          />
        </View>
        <Text style={styles.HeaderText}>Durum</Text>
        <View style={styles.AccountContainer}>
          <SpacingButton
            text="İlişki Durumu"
            style={styles.Button}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigation.navigate('Relation')}
          />
          <SpacingButton
            text="Doğum saati"
            style={styles.LastButton}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => navigation.navigate('Birthtime')}
          />
        </View>
        {
          <View style={styles.freezeAccountView}>
            <SpacingButton
              text="Hesabi sil"
              style={styles.LastButton}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
            />
          </View>
        }
      </View>
    </>
  );
}
