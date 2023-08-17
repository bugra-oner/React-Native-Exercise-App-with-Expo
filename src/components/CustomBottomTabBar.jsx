import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { navigate } from '../navigation/navigationRef';

import CustomTabIcon from './CustomTabIcon';

const CenterButton = ({color}) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.centerButton}
      onPress={() => navigate('Center')}
      activeOpacity={0.7} // Dokunma efektini ayarlar
    >
      <CustomTabIcon  color={color} source={require('../assets/centermuscle.png')} />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    width: 90,
    height:80,
    alignItems: "center",
    justifyContent:'center',
    alignContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0, // Biraz daha yukarı taşıdı
   
   
  },  
  centerButton: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(72, 79, 136, 0.8)',
    borderRadius: 40, // Yarıçapı genişletiyor
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 4, // Biraz daha yukarı taşıdı
    alignSelf: 'center',
    zIndex: 5,
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 5, // Android için gölge
  },
  buttonText: {
    marginTop: 5,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CenterButton;
