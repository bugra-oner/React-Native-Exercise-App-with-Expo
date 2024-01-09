// useFormFields.js

import { useState } from 'react';

/**
 * A custom hook for managing form fields.
 * @param {Object} initialValues - The initial values of the form fields.
 * @returns {Object} An object with the current form fields and a function to update form fields.
 */
const useFormFields = (initialValues) => {
  // State to hold the current form fields
  const [formFields, setFormFields] = useState(initialValues);

  /**
   * Updates a specific form field with the provided value.
   * @param {string} field - The name of the form field to update.
   * @param {any} value - The new value for the form field.
   */
  const updateFormField = (field, value) => {
    setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  // Return the current form fields and the function to update them
  return { formFields, updateFormField };
};

export default useFormFields;


//The useFormFields hook is designed to manage form fields within a React component. 
//It takes initialValues as an argument, representing the initial state of the form fields. 
//The hook returns an object with the current form fields (formFields) and a function (updateFormField) to update individual form fields. This hook is useful for handling form states in a controlled manner. If you have any questions or need further clarification, feel free to ask!
