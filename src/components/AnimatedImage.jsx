import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native'; // Lottie kütüphanesini ekledik

const AnimatedImage = ({ animationJson }) => {
  return (
      <LottieView
        source={animationJson} // JSON animasyon dosyasının yolu
        autoPlay
        loop
        style={styles.animation}
      />
    
  );
};

const styles = StyleSheet.create({

  animation:{
    width: 100,
    height: 150,
    resizeMode: 'contain',
    alignSelf: "center",
    backgroundColor: '#f7f6f6',
   
  },
});

export default AnimatedImage;
