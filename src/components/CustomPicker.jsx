// CustomPicker.js dosyası

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomPicker = ({ options, selectedValue, onValueChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionPress = (value) => {
    onValueChange(value);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedValue}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text>{selectedValue}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  selectedValue: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  optionsContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default CustomPicker;