import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';


// custom component
import colors from '../../constants/colors';
// import Past from '../../../assets/images/Past.svg';
import { hp,wp,fp } from '../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/views/Header';
//import { lang } from 'moment';



export default function Languages({ navigation }) {
  const { t, i18n } = useTranslation();
  const [changeLanguage, setChangeLanguage] = useState(i18n.language);

  // render header
  /*
  const _renderHeader = () => {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.settingsLG1, colors.settingsLG2]}
        style={styles.linearGradient}
      >
        <Past
          style={{
            marginVertical: 7,
            marginHorizontal: 12,
          }}
          width={35}
          height={35}
        />
        <Text style={styles.text}>{t('languages')}</Text>
        <Past
          style={{
            marginVertical: 7,
            marginHorizontal: 12,
          }}
          width={35}
          height={35}
        />
      </LinearGradient>
    );
  };
  */
  //Render Button View

  const handleSaveLanguage = () => {
    i18n.changeLanguage(changeLanguage);
  };

  const _renderButtonView = () => {
    return (
      <View style={styles.ButtonContainer}>
        <TouchableOpacity style={styles.Button} onPress={() => setChangeLanguage('en')}>
          <Text style={styles.text}>{t('English')}</Text>
          <MaterialCommunityIcons
            style={{ marginRight: wp(3) }}
            color={changeLanguage === 'en' ? 'green' : 'black'}
            name={changeLanguage === 'en' ? 'check' : 'chevron-right'}
            size={20}
          />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.Button} onPress={() => setChangeLanguage('tr')}>
          <Text style={styles.text}>{t('Turkish')}</Text>
          <MaterialCommunityIcons
            style={{ marginRight: wp(3) }}
            color={changeLanguage === 'tr' ? 'green' : 'black'}
            name={changeLanguage === 'tr' ? 'check' : 'chevron-right'}
            size={20}
          />
        </TouchableOpacity>
        <View style={styles.separator}></View>
        {/*waiting for translation*/}
        {/*
        <TouchableOpacity style={styles.button} onPress={() => i18n.changeLanguage('tr')}>
          <Text style={styles.langText}>{t('esp')}</Text>
          {i18n.language === 'esp' && (
            <MaterialCommunityIcons
              style={{ marginVertical: 5, marginHorizontal: 12 }}
              color="green"
              name="check"
              size={20}
            />
           
          )}
        </TouchableOpacity>
      */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        RightIconOnPress={() => handleSaveLanguage()}
        title={t('Languages')}
        LeftIconOnPress={() => navigation.goBack()}
        LeftIcon="chevron-left"
        RightIcon="check"
      />
      <Text style={styles.HeaderText}>{t("Language")}</Text>
      {_renderButtonView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
  linearGradient: {
    marginVertical: 20,
    marginHorizontal: 20,
    width: '90%',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    marginLeft: wp(4),
    
    color: 'black',
    fontSize: fp(1.8),
  },
  HeaderText: {
    fontSize: 18,
   
    marginTop: hp(2.5),
    marginLeft: wp(6.5),
    color: 'black',
  },
  Button: {
    width: wp(90),
    height: hp(4.6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#d6d6cd',
    borderBottomWidth: wp(0.26),
    borderStyle: 'solid',
    alignSelf: 'center',
  },
  ButtonContainer: {
    backgroundColor: 'white',
    width: wp(90),
    height: hp(10),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(2.3),
    shadowColor: 'black',
    opacity: 0.64,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
  },
});
