import React from 'react';
import { View, Text } from 'react-native';
import { translate } from '../i18n/Localization';

const MyComponent = () => {
  return (
    <View>
      <Text>{translate('Statistic')}</Text>
      <Text>{translate('totalWorkouts')}</Text>
      
    </View>
  );
};

export default MyComponent;

