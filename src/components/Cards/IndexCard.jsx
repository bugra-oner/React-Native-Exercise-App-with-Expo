import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'

import colors from '../../constants/colors'
import typography from '../../constants/typography'

import Woman from '../../assets/cards/woman.svg'

import { LinearGradient } from 'expo-linear-gradient';
import Button from '../Button'

import { fp } from '../../utils'



export default function IndexCard({title,subTitle,buttonTitle,borderRadius,onPress}) {
  return (
    <LinearGradient
    colors={[colors.gradientColor.colorFour, colors.gradientColor.colorThree]}
     style={styles.container}>
     <View style={styles.leftContainer}>
     <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <View style={styles.buttonContainer}>
      <Button
     title={buttonTitle}
     borderRadius={borderRadius}
     onPress={onPress}
      />
      </View>
      </View>
     <Woman 
        width= {200}
        height= {140}
        style={styles.SvgCard}
     /> 
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        flexDirection : 'row',
        marginVertical: 10,
        alignItems : 'center',
        width: '94%',
        alignSelf: 'center',
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 6,  // This adds shadow to Android and is optional
    },
    leftContainer:{
      marginHorizontal: 9,
      width : '44%',
      textAlign: 'center',
      alignItems: 'center',
    },
    title:{
        fontSize : typography.healthTitle,
        color: colors.title,
        fontWeight: 'bold',
    },
    subTitle:{
        fontSize: typography.healthInfo,
        color: colors.UiText,
        fontWeight: '400',
        marginTop: "2%",
        maxWidth: '90%',
        lineHeight: 14,
        marginBottom: 15,
    },
})