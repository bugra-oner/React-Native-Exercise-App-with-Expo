import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({title,borderRadius,onPress}) {
  return (
    <TouchableOpacity
    onPress={onPress} 
    style={[styles.container, {borderRadius: borderRadius}]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor :'#484F88',
    borderRadius : 25,
  },
  text:{
    color : '#F3F5FF',
    padding : 5,
    paddingHorizontal : 10,
  },
})