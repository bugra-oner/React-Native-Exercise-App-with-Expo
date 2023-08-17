import { StyleSheet, Text, View,ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


import typography from '../../constants/typography'
import colors from '../../constants/colors'


import IndexCard from '../../components/Cards/IndexCard'
import InfoCard from '../../components/Cards/InfoCard'
import { navigate } from '../../navigation/navigationRef'

export default function Graph() {
  const [healthData,setHealthData] = useState({});

  useEffect(() => {
    // AsyncStorage'den kaydedilen veriyi al
    const fetchHealthData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('calculatedData');
        console.log(savedData)
        if (savedData) {
          setHealthData(JSON.parse(savedData));
          console.log(healthData)
        }
      } catch (error) {
        console.log('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchHealthData();
  }, []);

  
  return (
    <ScrollView style={styles.container}>
      <IndexCard 
        buttonTitle="Şimdi başla"
        title="Sağlık Hesaplayıcısı"
        subTitle="Vücut Kitle İndeksi, Kalori ve Su Hesabı."
        borderRadius={5}
        onPress={() => navigate('HealthCalculator')}
      />
      <InfoCard 
        title="Hidrasyonun Önemi"
        description="Vücudun işlevlerini sürdürebilmesi için yeterli miktarda su tüketmek önemlidir. Hidrasyon, cildin sağlığını destekler, sindirim sistemi işlevini iyileştirir, enerji seviyelerini artırır ve daha fazlasını yapar."
        imageSource={require('../../assets/calf_raises.png')} // Görsel yolunu buraya eklemelisiniz
      />
      <View style={styles.container}>
      <Text style={styles.title}>Sağlık Sonuçları</Text>
      <Text>Vücut Kitle İndeksi: {healthData.bmi?.value}</Text>
      <Text>Durum: {healthData.bmi?.interpretation}</Text>
      <Text>Günlük Kalori İhtiyacı: {healthData.dailyCalories} kcal</Text>
      <Text>Günlük Su İhtiyacı: {healthData.dailyWater} ml</Text>
      <Text>İdeal Kilo: {healthData.idealWeight} kg</Text>
      {/* Diğer hesaplamaları da buraya ekleyebilirsiniz */}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        marginTop : 50,
    },
});