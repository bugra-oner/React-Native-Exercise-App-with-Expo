import React from 'react';
import { Text, View } from 'react-native';

const ListItem = ({ text }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',marginVertical: 1 }}>
      <Text style={{ marginRight: 5, fontSize: 13, fontWeight: '800' }}>•</Text>
      <Text style={{ fontSize: 11,fontWeight: '600' }}>{text}</Text>
    </View>
  );
};

export default ListItem;
