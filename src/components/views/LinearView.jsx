import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { LinearGradient } from 'expo-linear-gradient';

import colors from '../../constants/colors';

export default function LinearView({children}) {
  return (
    <LinearGradient style={styles.container}
    colors={[colors.gradientColor.workoutOne, colors.gradientColor.workoutTwo]}
    >{children}</LinearGradient>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: "25%",
    }
})