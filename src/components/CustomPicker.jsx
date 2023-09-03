import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomPicker = ({ options, selectedValue, onValueChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label
 
  
  const handleOptionPress = (value) => {
    onValueChange(value);
    setShowOptions(false);
    console.log(value)
  };

  return (
      <LinearGradient
           // İstediğiniz renk geçişlerini belirleyebilirsiniz
          colors={['#575ea8', '#83c29f']}
        start={[0, 0]}
       end={[1, 0]}
       style={styles.gradientContainer}
    >
      <TouchableOpacity
        style={styles.selectedValue}
        onPress={() => setShowOptions(!showOptions)}
      >
          <Text style={styles.selectedText}>{selectedLabel}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => handleOptionPress(option.value)}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      </LinearGradient>
   
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
    elevation: 5,
  },
  selectedValue: {
    padding: 10,
    borderRadius: 5,
  },
  selectedText: {
    color: '#fff',
  },
  optionsContainer: {
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default CustomPicker;

