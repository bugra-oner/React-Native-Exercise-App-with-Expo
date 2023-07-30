import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

export default function Home({navigation}) {
  return (
    
    <View style={styles.container}>
      <Text>Home</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Workout')} >
      <Text>asdfasdfasdfasdfasdfasfasfasfas</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex :1,
        marginTop: 125
    },
    button:{
        height: 100,
        width: 200,
    },
})