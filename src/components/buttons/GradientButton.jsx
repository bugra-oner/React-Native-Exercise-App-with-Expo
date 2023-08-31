import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ title, onPress, colors,style,textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors || ['#606191', '#111111']} // Default renkler
        start={[0, 0]}
        end={[1, 0]}
        style={[style  ? style : styles.gradientContainer]}
      >
        <Text style={[textStyle ? textStyle : styles.buttonText]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});

export default GradientButton;
