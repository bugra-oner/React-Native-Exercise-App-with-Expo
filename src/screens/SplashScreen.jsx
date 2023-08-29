import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('null'); // Ana uygulamanın bulunduğu ekranın adını vermelisiniz
    }, 2000); // 2 saniye

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedLottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
}

export default SplashScreen;
