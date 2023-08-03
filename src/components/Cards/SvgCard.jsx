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
        width= {160}
        height= {90}
        style={styles.SvgCard}
     />
     
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
        alignItems : 'center',
        alignSelf: 'center',
        borderRadius: 13,
        height: "100%",
        marginHorizontal: 15,
    },
    title:{
        fontSize : typography.title,
        color: colors.title,
        fontWeight: 'bold',

    },
    subTitle:{
        fontSize: typography.body,
        color: colors.subTitle,
        fontWeight: '600',
    },
    SvgCard:{
        position : 'auto',
        top: -10,
        
    }
})