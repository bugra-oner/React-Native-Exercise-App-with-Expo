import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'

import colors from '../../constants/colors'
import typography from '../../constants/typography'

import Human from '../../assets/Human.svg'

import { LinearGradient } from 'expo-linear-gradient';



export default function SvgCard({title,subTitle}) {
  return (
    <View>
    <LinearGradient
    colors={[colors.gradientColor.color, colors.gradientColor.colorTwo]}
     style={styles.container}>
     <Human 
        width= {150}
        height= {100}
        
       
     />
     
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems : 'center',
        borderRadius: 35
    },
    title:{
        fontSize : typography.title,
        color: colors.title,
        fontWeight: 'bold'
    },
    subTitle:{
        fontSize: typography.body,
        color: colors.subTitle,
        fontWeight: '600',
    },
})