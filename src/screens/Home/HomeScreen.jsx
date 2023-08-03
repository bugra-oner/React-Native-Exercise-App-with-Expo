import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import StarterCard from '../../components/Cards/StarterCard'
import SvgCard from '../../components/Cards/SvgCard'
import colors from '../../constants/colors'
import typography from '../../constants/typography'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StarterCard />
      <Text style={styles.title}>Genel Bakış</Text>
      <View style={styles.headerContainer}>
      <SvgCard title="Yapılan" subTitle="35 Egzersiz" />
      <SvgCard title="deneme" subTitle=" 3 Program" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  title:{
    marginLeft: '5%',
    marginTop: '2.5%',
   color: '#343854',
   fontSize : 17,
   fontWeight: 'bold',
  },
  headerContainer:{
    flexDirection : 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height : '20%',
    marginTop : "5%"
    
  }
})

