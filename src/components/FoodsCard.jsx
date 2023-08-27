import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ThreeSubtitle from './ThreeSubtitle'





export default function FoodsCard({Left,Middle,Right,title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ThreeSubtitle Left={Left} Middle={Middle} Right={Right} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{},
  title:{},
})