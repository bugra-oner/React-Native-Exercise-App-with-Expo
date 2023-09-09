import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';

const Test = () => {
  const sendNotification = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      if (existingStatus !== 'granted') {
        console.log('Bildirim izni reddedildi veya henüz verilmedi.');
        return;
      }

      const notification = {
        title: 'Test Bildirimi',
        body: 'Bu bir test bildirimidir.',
      };

      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null, // Bildirimi hemen gönder
      });

      console.log('Bildirim gönderildi.');
    } catch (error) {
      console.error('Bildirim gönderme hatası:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={sendNotification}>
        <Text>Bildirim Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;

