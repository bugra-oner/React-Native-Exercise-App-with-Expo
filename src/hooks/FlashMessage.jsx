// useFlashMessage.js


import { showMessage } from 'react-native-flash-message';

const useFlashMessage =    () => { 
  const showFlashMessage =   (message, description, type) => {
   showMessage({
      message: message,
      description: description,
      type: type,
      icon: type,
      duration: 1500, // 3 saniye sonra otomatik olarak kapanır
    });
  };

 

  return {
    showFlashMessage,
  };
};

export default useFlashMessage;
