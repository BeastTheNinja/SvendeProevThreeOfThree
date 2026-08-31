import { useState, type ChangeEvent } from "react";

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

type UseFormOptions<T> = {
  initialValues: T;
  validate?: (values: T) => ValidationErrors<T>;
};

function useForm<T>({
  initialValues,
  validate,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!validate) {
      return true;
    }

    const validationErrors = validate(values);

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
  }

  return {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm,
  };
}

export default useForm;
