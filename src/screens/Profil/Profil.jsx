import { Text, View } from 'react-native';
import React from 'react';
import SpacingButton from '../../components/buttons/SpacingButton';
import Header from '../../components/views/Header';

import  { navigate } from '../../navigation/navigationRef';
import styles from './styles';

import { useTranslation } from 'react-i18next';

export default function Profil({ navigation }) {
  const {t} = useTranslation();
  return (
    <>
      <Header
        title={'Kişisel Bilgiler'}
        LeftIconOnPress={() => navigation.goBack()}
        RightIconOnPress={() => navigate('Notifications')}
        RightIcon="bell-outline"
        LeftIconSize={33}
      />
      <View style={styles.container}>
        <Text style={styles.HeaderText}>{t("PersonelI")}</Text>
        
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
         <Text style={styles.HeaderText}>{t('Status')}</Text>
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
            onPress={() => navigate("Notifications")}
          />
        </View> 
          <View style={styles.AccountContainer}>
            <SpacingButton
              text={t("ReportSystem")}
              style={styles.LastButton}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => navigate("Report")}
            />
            <SpacingButton
              text={t("Policy")}
              style={styles.LastButton}
              textStyle={styles.ButtonText}
              iconName="chevron-right"
              iconStyle={styles.iconStyle}
              onPress={() => navigate("Policy")}
              />
          </View>
      </View>
    </>
  );
}
