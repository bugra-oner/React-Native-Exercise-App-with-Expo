import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



import BenchHome from '../../assets/BenchHome.svg'
import typography from '../../constants/typography';
import colors from '../../constants/colors';
import {useTranslation} from 'react-i18next';


export default function CreaterCard({ onPress,marginTop,
  height = "17%"
 }) {
  const { t, i18n } = useTranslation();


  return (
        
        <LinearGradient 
        colors={[colors.gradientColor.color, colors.gradientColor.colorTwo]}
        style={[styles.container,{marginTop: marginTop ,height: height}]}
        >
        <View style={styles.topContainerView}>
          <Text style={styles.titleText}>
             {t('readyProgram')}
          </Text>
          <Text style={styles.subTitleText}>
            {t('readyProgramSubtitle')}
          </Text>
          <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={onPress} >
         <Text style={styles.buttonText}>
          {t('nowStart')}
          </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.deneme}>
          </View>
          <BenchHome  width={235} height={235} style={styles.benchHome}   />
          </LinearGradient>
          
  );
}

const styles = StyleSheet.create({
  container:{
        width: '90%',
        shadowColor: '#7b7b82',
        shadowOpacity: 0.7,
        shadowRadius: 1.3208664655685425,
        borderRadius: 13.21,
        elevation: 1, // Use elevation to display shadow on Android
        alignSelf: "center",
        flexDirection: 'row'
        },
  topContainerView:{
    width: '50%',
    height: '84%',
    marginLeft: '4%',
    marginTop : '4.5%',
  },
  titleText:{
    fontWeight : '700',
    color : 'white',
    fontSize: typography.title,
    lineHeight: 15.85,
  },
  subTitleText:{
    color: 'white',
    fontSize : 10,
    lineHeight : 15,
    marginTop: 5,
    maxWidth :'100%',
    fontWeight: '600'
  },
  buttonContainer:{
    backgroundColor : '#F3F5FF',
    borderRadius: 5,
    width: "60%",
    height: "25%",
    textAlign : 'center',
    alignItems: 'center',
    justifyContent: 'center', // Aynı zamanda yazıyı yatayda ve dikeyde ortalayacağız
    marginTop : '8%',
  },
  buttonText:{
    color: '#3d4160',
    alignSelf:'center',
    fontWeight: 'bold'
  },
  benchHome:{
    right: 65, // Sağ kenardan 10 birim uzaklıkta
    top: -64, // Üst kenardan 20 birim yukarıda
  }
});