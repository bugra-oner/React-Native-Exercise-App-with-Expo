import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import StarterCard from '../../components/Cards/StarterCard'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StarterCard />
     
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
})

