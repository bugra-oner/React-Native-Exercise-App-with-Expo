import { StyleSheet, Text, View,ScrollView,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


import typography from '../../constants/typography'
import colors from '../../constants/colors'

// import { useIsFocused } from '@react-navigation/native';
// import { CommonActions } from '@react-navigation/native';


import { useTranslation } from 'react-i18next'

import IndexCard from '../../components/Cards/IndexCard'
import InfoCard from '../../components/Cards/InfoCard'
import { navigate } from '../../navigation/navigationRef'
import Card from '../../components/Card'

import CategoriesButton from '../../components/buttons/CategoriesButton'
import Header from '../../components/views/Header'

export default function Graph({navigation,route}) {
  const [healthData,setHealthData] = useState({});
  const {t} = useTranslation();

  // useEffect(() => {
  //   // AsyncStorage'den kaydedilen veriyi al
  //   const fetchHealthData = async () => {
  //     try {
  //       const savedData = await AsyncStorage.getItem('calculatedData');
  //       console.log(savedData)
  //       if (savedData) {
  //         setHealthData(JSON.parse(savedData));
  //         console.log(healthData)
  //       }
  //     } catch (error) {
  //       console.log('Error fetching data from AsyncStorage:', error);
  //     }
  //   };

  //   fetchHealthData();
  // }, []);

  // const fetchHealthData = async () => {
  //   try {
  //     const savedData = await AsyncStorage.getItem('calculatedData');
  //     console.log(savedData)
  //     if (savedData) {
  //       setHealthData(JSON.parse(savedData));
  //       console.log(healthData)
  //     }
  //   } catch (error) {
  //     console.log('Error fetching data from AsyncStorage:', error);
  //   }
  // };

  // const isFocused = useIsFocused();

  useEffect(() => {
    // AsyncStorage'den kaydedilen veriyi al
    const fetchHealthData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('calculatedData');
        if (savedData) {
          setHealthData(JSON.parse(savedData));
        }
      } catch (error) {
        console.log('Error fetching data from AsyncStorage:', error);
      }
    };
  
    fetchHealthData();
  
    // Eğer ana ekran verileri güncellendi ise veriyi yeniden al
    if (route.params?.updateHealthDataOnScreen) {
      fetchHealthData();
    }
  }, [route.params?.updateHealthDataOnScreen]);

  
  return (
    <>
    <Header 
    LeftIcon='artstation'
    RightIcon='graphql'
    title={"Sağlık"}/>
    <ScrollView style={styles.container}>
      <IndexCard 
        unHealth={true}
        buttonTitle="Şimdi başla"
        title="Sağlık Bilgilerini Bul"
        subTitle="Vücut Kitle İndeksi, Kalori ve Su Hesabı."
        borderRadius={5}
        onPress={() => navigate('HealthCalculator')}
      />
      <View style={styles.CategoriesButton}>
      <CategoriesButton title={t("Cardio")}  name="walk" iconColor={"rgba(72, 79, 136, 0.8)"} size={30}
      color={"#ae9b83"} />
      <CategoriesButton  title={t("Strength")}  name="dumbbell" size={30} iconColor={"rgba(72, 79, 136, 0.8)"} color={"#ae7070"}/>
      <CategoriesButton  title={t("Endurance")} name="horse-variant-fast" size={30} iconColor={"rgba(72, 79, 136, 0.8)"} color={"#35c3dc"}/>
      <CategoriesButton  title={t("More")}  name="grain"  iconColor={"rgba(72, 79, 136, 0.8)"} size={30} color={"#7faedc"}/>
      </View>
      <Card
    title="Sağlık Sonuçları"
    icon="aperture-outline"
      subtitle="Durum"
    contentText={`Vucüt Kitle İndeksi : ${healthData.bmi?.interpretation ? healthData.bmi?.interpretation : "" }`}
    bottomTexts={[
    { text: `Günlük Kalori İhtiyacı`,  },
    { text: "Günlük Su İhtiyacı",  },
    { text: "İdeal Kilo",  },
  ]}
  subTexts={[` ${healthData.dailyCalories? healthData.dailyCalories : ""} ` ,
   `${healthData.dailyWater? healthData.dailyWater : ""}`,
   `${healthData.idealWeight? healthData.idealWeight : ""}`]}
      subTextIcons={["fast-food", "water", "man"]}
      additionalText="Sağlık Bilgileri"
      additionalIcon="ios-add-circle-outline"
    />
  
      {/* /* <View style={styles.container}>
      <Text style={styles.title}>Sağlık Sonuçları</Text>
      <Text>Vücut Kitle İndeksi: </Text>
      <Text>Durum: {healthData.bmi?.interpretation ? healthData.bmi?.interpretation: "" } </Text>
      <Text>Günlük Kalori İhtiyacı: {healthData.dailyCalories} kcal</Text>
      <Text>Günlük Su İhtiyacı: {healthData.dailyWater} ml</Text>
      <Text>İdeal Kilo: {healthData.idealWeight} kg</Text>
      Diğer hesaplamaları da buraya ekleyebilirsiniz</View> */}
      
    
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        marginVertical: 10,
    },
    CategoriesButton:{
      flexDirection : "row",
      alignItems: "center",
      alignContent:"center",
      justifyContent:"center",
      marginVertical: 20
    },
    title:{
      fontSize: typography.title,
    }
});