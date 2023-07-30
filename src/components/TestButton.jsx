import React from 'react';
import { View, Pressable, Text } from 'react-native';

const TestButton = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        style={{ padding: 20, backgroundColor: 'lightblue' }}
        onPress={() => console.log('Button Pressed!')}
      >
        <Text>Press me</Text>
      </Pressable>
    </View>
  );
};

export default TestButton;
