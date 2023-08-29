import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Header from '../components/views/Header'
import TextSection from '../components/TextSection'
import ListItem from '../components/ListItem'

import { useTranslation } from 'react-i18next'

export default function Policy({navigation}) {
    const {t} = useTranslation();
    

  return (
    <ScrollView>
      <Header
        title={t('Policy')}
        LeftIconOnPress={() => navigation.goBack()}
        RightIconOnPress={() => null}
        LeftIcon="chevron-left"
        LeftIconSize={33}
        RightIcon="alert-octagon"
      />
      <View style={styles.container}>
      <TextSection 
      title={t('PrivacyPolicy')}  
      content={t('PrivacyPolicyText')} /> 
      <TextSection
      title={t('InformationCollectionAndUse')}
      content={t('InformationText')} 
      />

     <ListItem text={'Google Play Services'} />
     <ListItem text={'Expo'} />  
     <TextSection
      title={t('LogData')}
      content={t('LogText')} 
      />
      <TextSection
       title={t('Cookies')}
       content={t('CookiesText')}
       />
      
      <Text style={styles.heading}>
          {t('ServiceProviders')}
      </Text>
      <Text style={styles.paragraph}>
      <ListItem  text={t('ServiceTextOne')} />
      {'\n'}
      <ListItem  text={t('ServiceTextTwo')} />
      {'\n'}
      <ListItem  text={t('ServiceTextThree')} />
      {'\n'}
      <ListItem  text={t('ServiceTextFour')} />
      </Text>
      <Text style={styles.paragraph}>
      {t('ServiceParagraph')}
      </Text>

      <TextSection 
      title={t('Security')}
      content={t('SecurityText')}
      />
      <TextSection 
      title={t('LinkOther')}
      content={t('LinkOtherText')}
      />
      <TextSection 
      title={t('ChildrenPrivacy')}
      content={t('ChildrenPrivacyText')}
      />
      <TextSection
      title={t('ChangesToThisPrivacyPolicy')}
      content={t('ChangesToThisPrivacyText')}
      />
      <TextSection
      title={t('ContactUs')}
      content={t('ContactUsText')}
      />
</View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 18,
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    paragraph: {
      fontSize: 10,
      marginBottom: 10,
      fontWeight: '600',
    },
    contact: {
      fontSize: 16,
      marginTop: 20,
    },
  });