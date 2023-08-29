import {  Text, StyleSheet  } from 'react-native'
import React from 'react'

export default function TextSection({title,content,styleTitle,styleContent}) {
  return (
    <>
        <Text style={[styles.header, styleTitle]}>{title}</Text>
        <Text style={[styles.content, styleContent]}>{content}</Text>
    </>
  )
}


const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 4,
  },
  content: {
    fontSize: 11,
    color: '#000000',
    marginVertical: 3,
    fontWeight: '600',
  }
})
