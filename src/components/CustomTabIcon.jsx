import React from 'react';
import { Image } from 'react-native';

const CustomTabIcon = ({ source,color }) => {
  return <Image source={source} style={{ width: 30, height: 30, tintColor: color  }} />;
};

export default CustomTabIcon;
