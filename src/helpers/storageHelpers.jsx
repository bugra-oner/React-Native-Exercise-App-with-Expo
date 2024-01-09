// helpers/storageHelper.js

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Retrieves the protein amount from AsyncStorage.
 * @returns {Promise<string>} A promise that resolves to the stored protein amount.
 */
const getProteinAmountFromStorage = async () => {
  try {
    const proteinAmount = await AsyncStorage.getItem('proteinAmount');

    if (proteinAmount !== null) {
      // You can use the data retrieved from AsyncStorage here
      //console.log('getProteinAmount', proteinAmount);
      return proteinAmount;
    } else {
      // If there is no stored protein amount in AsyncStorage, you can return a default value
      return '0'; // We've chosen '0' as the default value here; you can use any value you prefer
    }
  } catch (error) {
    //console.error('Error getting protein amount from AsyncStorage:', error);
    throw error; // Throw an error in case of an error situation
  }
};

export default getProteinAmountFromStorage;

/*
Explanation:

Purpose of the Helpers Folder: The helpers folder typically contains utility functions or helper modules that assist in specific tasks throughout the application. In this example, the storageHelper.js file inside the helpers folder serves the purpose of handling AsyncStorage-related functionality.

Usage of Comments: Comments are used to provide a clear understanding of the code:

The comment at the top briefly describes the file's purpose.
The comment above the function describes the specific task of the function.
Inline comments explain key steps within the function, such as attempting to retrieve data, checking for null values, and error handling.
Promise and Return Type: The function returns a Promise<string>, indicating that it is asynchronous (due to its use of async/await) and resolves to a string value, which is the stored protein amount.

This structure and commenting style aim to enhance the code's readability and maintainability, making it easier for other developers (or yourself in the future) to understand and work with the helper function.

*/

