import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomCircle = ({ size, progress }) => {
  const radius = size / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size }}>
      <View style={[StyleSheet.absoluteFill, styles.circleContainer]}>
        <View
          style={[
            styles.circle,
            { width: size, height: size, borderRadius: radius },
          ]}
        />
        <View
          style={[
            styles.progress,
            { width: size, height: size, borderRadius: radius, strokeDashoffset },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{progress * 100}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderWidth: 2,
    borderColor: 'gray',
  },
  progress: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'green',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  progressText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    top: '40%',
    left: '45%',
  },
});

export default CustomCircle;
