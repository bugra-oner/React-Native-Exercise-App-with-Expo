import Header from '../../components/views/Header';

import React, { useState,useEffect,useRef } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

import { hp,fp,wp } from '../../utils';

import useFlashMessage from '../../hooks/FlashMessage';
import { useNotificationScheduling } from '../../hooks/useNotificationScheduling';

import { useTranslation } from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GradientButton from '../../components/buttons/GradientButton';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const NotificationItem = ({ label, isChecked, toggleSwitch }) => (

  <View style={styles.notificationItem}>
    <Text style={styles.notificationLabel}>{label}</Text>
    <Switch
      style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
      trackColor={{ false: '#121213', true: '#81b0ff' }}
      thumbColor={isChecked ? '#1A1624' : '#f4f3f4'}
      onValueChange={toggleSwitch}
      value={isChecked}
    />
  </View>
);

const Notification = ({ navigation }) => {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { interval } = useNotificationScheduling(); 

  useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Antreman Zamanı 📬",
      body: 'Günlük antreman vaktini kaçırma!',
    },
    trigger: { seconds: 2 },
    repeat : true
});
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'f52537d0-aa92-4234-8be2-5141ba3c76b2' })).data;
    //console.log(token);
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  return token;
}
  const { t } = useTranslation();

  const { showFlashMessage } =  useFlashMessage();

  
  
  const [notificationSettings, setNotificationSettings] = useState({
    notification1: false,
    notification2: false,
    notification3: false,
    notification4: false,
  });

  const _HeaderView = () => (
    <Header
      title={t('Notifications')}
      LeftIconOnPress={() => navigation.goBack()}
      RightIconOnPress={() => navigation.navigate('Notifications')}
      LeftIcon="chevron-left"
      RightIcon="bell-badge"
      LeftIconSize={33}
    />
  );
  const handleToggleSwitch = (key) => {
    if (key === 'notification4') {
      // "Bildirimleri Kapat" seçeneği seçildiğinde diğer bildirimleri kapat
      setNotificationSettings((prevSettings) => ({
        notification1: false,
        notification2: false,
        notification3: false,
        notification4: !prevSettings.notification4, // "Bildirimleri Kapat" seçeneği durumunu tersine çevir
      }));
    } else {
      // Diğer bildirimler seçildiğinde "Bildirimleri Kapat" seçeneğini kapat
      setNotificationSettings((prevSettings) => ({
        notification1: key === 'notification1'  && !prevSettings.notification1,
        notification2: key === 'notification2' && !prevSettings.notification2,
        notification3: key === 'notification3'&& !prevSettings.notification3,
        notification4: false, // Diğer bildirimler seçildiğinde "Bildirimleri Kapat" seçeneğini kapat
      }));
    }
  };
  
  

  const handleSaveSettings = async () => {
    try {
      // Kullanıcının seçtiği bildirim aralığını alın
      let selectedInterval = null;
      if (notificationSettings.notification1) {
        selectedInterval = 24; // 24 saat seçildi
      } else if (notificationSettings.notification2) {
        selectedInterval = 36; // 36 saat seçildi
      } else if (notificationSettings.notification3) {
        selectedInterval = 48; // 48 saat seçildi
      }
      else if(notificationSettings.notification4){
        selectedInterval = 0; 
      }

       try {
        if (selectedInterval !== null) {
          await AsyncStorage.setItem('notification_interval', selectedInterval.toString());
          schedulePushNotification();
        }
      } catch (error) {
        console.error('Bildirim ayarlarını kaydetme hatası:', error);
      }
      

      // Diğer bildirimleri otomatik olarak kapatın
    setNotificationSettings((prevSettings) => ({
      notification1: prevSettings.notification1 && selectedInterval === 24,
      notification2: prevSettings.notification2 && selectedInterval === 36,
      notification3: prevSettings.notification3 && selectedInterval === 48,
      notification4: prevSettings.notification4,
    }));

    // Bildirimleri ayarları kaydedebilirsiniz
    //  console.log(notificationSettings);
    showFlashMessage(`${t('DevelopmentInProgressTitle')}`, `${t('DevelopmentInProgress')}`, "warning");
  } catch (error) {
    // console.error('Bildirim ayarlarını kaydetme hatası:', error);
  }

}



const getNotificationInterval = async () => {
  try {
    const interval = await AsyncStorage.getItem('notification_interval');
    // console.log("interval",interval)
    return interval ? parseInt(interval) : 24; // Varsayılan olarak 24 saat
  } catch (error) {
    // console.error('Bildirim aralığı okuma hatası:', error);
    return 24; // Varsayılan olarak 24 saat
  }
};
  
useEffect(() => {
  // Sayfa açıldığında kaydedilen bildirim aralığını alın
  const loadNotificationInterval = async () => {
    const interval = await getNotificationInterval()
    // console.log("interval, useEffect",interval)
    
    // Seçilen bildirim aralığına göre switch işlemlerini ayarlayın
    setNotificationSettings({
      notification1: interval === 24,
      notification2: interval === 36,
      notification3: interval === 48,
      notification4: interval === 0,
    });
  };

  loadNotificationInterval();
}, []);


  

  return (
    <View style={styles.container}>
      <_HeaderView 
        
      />
      <Text style={styles.title}>Antremanları Hatırlat</Text>
      <NotificationItem
        label={t('24Hours')}
        isChecked={notificationSettings.notification1}
        toggleSwitch={() => handleToggleSwitch('notification1')}
      />
      <NotificationItem
        label={t('24Hours')}
        isChecked={notificationSettings.notification2}
        toggleSwitch={() => handleToggleSwitch('notification2')}
      />
      <NotificationItem
        label={t('48Hours')}
        isChecked={notificationSettings.notification3}
        toggleSwitch={() => handleToggleSwitch('notification3')}
      />
      <Text style={styles.title}>t{'AllClose'}</Text>
      <NotificationItem
        label={t('AllClose')}
        isChecked={notificationSettings.notification4}
        toggleSwitch={() => handleToggleSwitch('notification4')}
      />
      <GradientButton style={styles.saveButton} onPress={handleSaveSettings}
          title={t('Save')}
      />
       {/* <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Test')}>
        <Text style={styles.saveButtonText}>TESTE GİT</Text>
      </TouchableOpacity>  */}
      
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
   
    marginBottom: 16,
    marginTop: 24,
    marginLeft: 24,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a879e6',
    width: wp(90),
    height: hp(5.9),
    borderRadius: 15,
    marginTop: hp(2),
    shadowColor: 'black',
    opacity: 0.64,
    shadowOffset: { width: 25, height: 25 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
  },
  notificationLabel: {
    fontSize: 16,
   
    color: '#313030',
    marginHorizontal: 16,
  },
  saveButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 24,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
