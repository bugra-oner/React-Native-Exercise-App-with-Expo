import { Text, View } from 'react-native';
import React from 'react';
import SpacingButton from '../../components/buttons/SpacingButton';
import Header from '../../components/views/Header';

import  { navigate } from '../../navigation/navigationRef';
import styles from './styles';

import { useTranslation } from 'react-i18next';

export default function Account({ navigation }) {
  const {t} = useTranslation();
  return (
    <>
      <Header
        title={'Kişisel Bilgiler'}
        LeftIconOnPress={() => navigate("Workouts")}
        RightIconOnPress={() => navigation.navigate('Notifications')}
        LeftIcon="weight-lifter"
        RightIcon="bell-outline"
        LeftIconSize={33}
      />
      <View style={styles.container}>
        <Text style={styles.HeaderText}>{t("PersonelI")}</Text>
        <Text>afasdfas</Text>
        <Text>asfasdfas</Text>
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
            onPress={() => navigate("Name")}
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
            onPress={() => navigate("Gender")}
          />
        </View>
         <Text style={styles.HeaderText}>Durum</Text>
        <View style={styles.AccountContainer}>
          <SpacingButton
            text={t("Languages")}
            style={styles.Button}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() =>  navigate("Languages")}
          />
          <SpacingButton
            text={t("Notifications")}
            style={styles.LastButton}
            textStyle={styles.ButtonText}
            iconName="chevron-right"
            iconStyle={styles.iconStyle}
            label="Değiştir"
            labelStyle={styles.labelStyle}
            threeText={styles.threeText}
            onPress={() => console.log("Test")}
          />
        </View> 
          <View style={styles.freezeAccountView}>
            <SpacingButton
              text={t("ReportSystem")}
              style={styles.LastButton}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
            />
          </View>
      </View>
    </>
  );
}
