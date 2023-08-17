import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

export default function ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  multiline,
  numberOfLines,
  maxLength,
  editable,
  style,
  inputStyle,
  containerStyle,
  error,
  onEndEditing,
}) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        editable={editable}
        style={[inputStyle, style]}
        onEndEditing={onEndEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
