import { StyleSheet,Image,Text,View} from 'react-native'
import React from 'react'

import { LinearGradient } from 'expo-linear-gradient';

import colors from '../../constants/colors';
import { hp,fp,wp } from '../../utils';


export default function GradientImage({colorsOne, colorsTwo ,source,text}) {
  return (
    <LinearGradient style={styles.container}
    colors={[colorsOne ?  colorsOne : colors.gradientColor.workoutOne, colorsTwo ? colorsTwo : colors.gradientColor.workoutTwo]}
    >
      <Image resizeMode="cover"  style={styles.image} source={require('../../assets/spartan-woman.png')} />
      <View style={styles.TextView}>
      <Text style={styles.Text}></Text>
      <Text style={styles.Text}>artan tekrar sayısı</Text>
      </View>
      </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container:{
            width: wp(90),
            height  : hp(14),
            alignSelf : 'center',
            marginVertical : hp(5),
            flexDirection: 'row',
            borderRadius : 15,
      
    },  
    image:{
        width: wp(30),
        height : hp(14),
        marginHorizontal: hp(3),
    },
    TextView:{
      width: wp(36),
      height : hp(14),
      alignSelf: 'center',
      justifyContent: 'center',
    },
    Text:{
      textAlign: 'center',
    }
})