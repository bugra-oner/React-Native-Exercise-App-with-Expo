// useFlashMessage.js

import { showMessage } from "react-native-flash-message";

/**
 * A custom hook for displaying Flash Messages using react-native-flash-message.
 * @returns {Object} An object with a function to show Flash Messages.
 */
const useFlashMessage = () => {
  /**
   * Displays a Flash Message with the specified content and type.
   * @param {string} message - The message to be displayed.
   * @param {string} description - The description or additional information.
   * @param {string} type - The type of the Flash Message (e.g., success, error, warning).
   */
  const showFlashMessage = (message, description, type) => {
    showMessage({
      message: message,
      description: description,
      type: type,
      icon: type, // You can customize the icon based on the type if needed
      duration: 2000, // Automatically closes after 2 seconds
    });
  };

  // Return the function to show Flash Messages
  return {
    showFlashMessage,
  };
};

export default useFlashMessage;

