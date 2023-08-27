/* eslint-disable react/prop-types */
// CustomIcon component
import React from 'react';
import { StyleSheet, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { wp } from '../utils';

function CustomIcon({
  name,
  size = 35,
  color = '#900',
  marginHorizontal = wp(2),
  marginRight = wp(2.5),
}) {
  return (
    <View
      style={{
        marginHorizontal,
        marginRight,
      }}
    >
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </View>
  );
}

export default CustomIcon;