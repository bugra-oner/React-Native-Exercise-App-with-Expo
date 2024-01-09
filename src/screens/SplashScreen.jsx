// SplashScreen.js

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// SplashScreen component
function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timeout for navigation after 2.85 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('BottomNavigator'); // Provide the name of the screen where you want to navigate
    }, 2850); // 2.85 seconds

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={['#8fb9b7', '#859398','#484F88','#2A4E47','#4e615b']}
      style={styles.container} // Customize with your desired gradient colors
    >
      <AnimatedLottieView
        source={require('../assets/animations/loading.json')}
        autoPlay
        loop
      />
    </LinearGradient>
  );
}

/*
Comment lines have been added. 
This Splash screen component represents a loading screen that appears at the beginning 
of the application and is redirected to the main application screen after a certain period of time.
*/

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
