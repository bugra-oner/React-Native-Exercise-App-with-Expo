import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { hp, wp } from '../../utils';

export default function SpacingButtons({
  onPress,
  text,
  style,
  textStyle,
  iconName,
  iconStyle,
  label,
  labelStyle,
  threeText,
  iconSize = 20,
  iconColor = 'grey',
  special = false,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>

      <View style={threeText}>
        {label && <Text style={[labelStyle]}>{label}</Text>}
        <MaterialCommunityIcons
          style={[styles.icon, iconStyle, special && { marginLeft: 'auto' }]}
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    marginLeft: wp(4),
  },
});