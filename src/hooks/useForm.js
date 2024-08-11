import { useState } from "react";

export const useForm = (initialValues, validators) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, type, checked, files, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]:
        type === "checkbox"
          ? checked 
          : type === "file"
          ? files 
          : value,
    }));
  };

  const handleFormValidation = () => {
    const errorsList = {};

    for (const key in validators) {
      const error = validators[key](values[key]);
      if (error) errorsList[key] = error;
    }

    setErrors(errorsList);
    return Object.keys(errorsList).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    handleInputChange,
    handleFormValidation,
    errors,
    resetForm
  };
};
