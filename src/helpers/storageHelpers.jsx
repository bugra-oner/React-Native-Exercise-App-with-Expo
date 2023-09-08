// storageHelper.js

import AsyncStorage from '@react-native-async-storage/async-storage';

 const getProteinAmountFromStorage = async () => {
  try {
    const proteinAmount = await AsyncStorage.getItem('proteinAmount');
    if (proteinAmount !== null) {
      // AsyncStorage'den alınan veriyi kullanabilirsiniz
      console.log('getProteinAmount', proteinAmount);
      return proteinAmount;
    } else {
      // AsyncStorage'de kayıtlı bir protein miktarı yoksa varsayılan bir değer döndürebilirsiniz
      return '0'; // Varsayılan değeri burada '0' olarak kabul ettik, istediğiniz bir değeri verebilirsiniz
    }
  } catch (error) {
    console.error('Error getting protein amount from AsyncStorage:', error);
    throw error; // Hata durumunda hata fırlatın
  }
};


export default getProteinAmountFromStorage;
