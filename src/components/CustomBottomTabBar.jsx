import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CenterButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.centerButton} onPress={onPress}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    width:100,
    height:100,
  },
  centerButton: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(72, 79, 136, 0.8)',
    borderRadius: 50, // Yuvarlak hale getiriyor
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10, // Dilediğiniz yükseklik ayarlayabilirsiniz
    alignSelf: 'center',
    zIndex: 5, // Görünürlük düzeni için
    shadowColor: 'white', // Beyaz bir gölge ekler
    shadowOpacity: 0.7,
    shadowRadius: 6, // Gölge yuvarlaklığı
    borderWidth: 5, // Beyaz kenarlık ekler
    borderColor: 'white', // Kenarlık rengi
  },
});

export default CenterButton;

