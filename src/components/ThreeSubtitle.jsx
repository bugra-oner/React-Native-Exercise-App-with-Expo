import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ThreeSubtitle({Left,Middle,Right}) {
  return (
    <View style={styles.container}>
      <Text style={styles.first}>{Left}</Text>
      <Text style={styles.middle}>{Middle}</Text>
      <Text style={styles.right}>{Right}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{},
  first:{},
  middle:{},
  right:{},
})