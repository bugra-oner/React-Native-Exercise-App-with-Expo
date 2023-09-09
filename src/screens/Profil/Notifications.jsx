import Header from '../../components/views/Header';

import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

import { hp,fp,wp } from '../../utils';

import useFlashMessage from '../../hooks/FlashMessage';

import { useTranslation } from 'react-i18next';

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
      title="Bildirimler"
      LeftIconOnPress={() => navigation.goBack()}
      RightIconOnPress={() => navigation.navigate('Notifications')}
      LeftIcon="chevron-left"
      RightIcon="bell-badge"
      LeftIconSize={33}
    />
  );
  const handleToggleSwitch = (key) => {
    setNotificationSettings({ ...notificationSettings, [key]: !notificationSettings[key] });
  };

  const handleSaveSettings = () => {
    // burada bildirim ayarlarını kaydedebilirsiniz
    //console.log(notificationSettings);
  };

  useEffect(() => {
    showFlashMessage(`${t('DevelopmentInProgressTitle')}`, `${t('DevelopmentInProgress')}`, "warning");
  },[])
  

  return (
    <View style={styles.container}>
      <_HeaderView />
      <Text style={styles.title}>... Kategori</Text>
      <NotificationItem
        label="Bildirim 1"
        isChecked={notificationSettings.notification1}
        toggleSwitch={() => handleToggleSwitch('notification1')}
      />
      <NotificationItem
        label="Bildirim 2"
        isChecked={notificationSettings.notification2}
        toggleSwitch={() => handleToggleSwitch('notification2')}
      />
      <NotificationItem
        label="Bildirim 3"
        isChecked={notificationSettings.notification3}
        toggleSwitch={() => handleToggleSwitch('notification3')}
      />
      <Text style={styles.title}>.... Kategori </Text>
      <NotificationItem
        label="Bildirim 4"
        isChecked={notificationSettings.notification4}
        toggleSwitch={() => handleToggleSwitch('notification4')}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Test')}>
        <Text style={styles.saveButtonText}>TESTE GİT</Text>
      </TouchableOpacity>
      
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
    backgroundColor: '#a1a1a1',
    width: wp(90),
    height: hp(5.5),
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
    paddingVertical: 12,
    paddingHorizontal: 16,
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
