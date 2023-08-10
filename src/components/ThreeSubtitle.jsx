import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ThreeSubtitle({Left,Middle,Right}) {
  return (
    <View>
      <Text>{Left}</Text>
      <Text>{Middle}</Text>
      <Text>{Right}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})