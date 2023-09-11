import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useNotificationScheduling = () => {
  const [interval, setInterval] = useState(24); // Varsayılan bildirim aralığı 24 saat

  useEffect(() => {
    const loadNotificationInterval = async () => {
      try {
        const storedInterval = await AsyncStorage.getItem('notification_interval');
        if (storedInterval) {
          setInterval(parseInt(storedInterval));
        }
      } catch (error) {
        // console.error('Bildirim aralığı okuma hatası:', error);
      }
    };

    loadNotificationInterval();
  }, []);

  return { interval };
};
