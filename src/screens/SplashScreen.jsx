import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('BottomNavigator'); // Ana uygulamanın bulunduğu ekranın adını vermelisiniz
    }, 1850); // 2 saniye

    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={['#b6b1aa', '#859398','#484F88','#2A4E47','#4e615b']}
      style={styles.container} // İstediğiniz gradient renkleri
      >
      <AnimatedLottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
      />
    </LinearGradient>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  