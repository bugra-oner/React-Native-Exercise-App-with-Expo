// useFormFields.js

import { useState } from 'react';

const useFormFields = (initialValues) => {
  const [formFields, setFormFields] = useState(initialValues);

  const updateFormField = (field, value) => {
    setFormFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  return { formFields, updateFormField };
};

export default useFormFields;
