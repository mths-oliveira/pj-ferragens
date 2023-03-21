import { useState, useEffect } from 'react';

export interface FieldRef extends HTMLDivElement {}

type HandleSubmit<T> = (data: T) => void;

export function useForm<T = any>(handleSubmit: HandleSubmit<T>) {
  const [fields, setFields] = useState<FieldRef[]>([]);

  function registerField(field: FieldRef) {
    if (!field || fields.includes(field)) return;
    setFields([...fields, field]);
  }

  function onSubmit() {
    const data = getDataFromFields();
    handleSubmit(data);
  }

  function getDataFromFields() {
    const data = {} as T;
    for (const field of fields) {
      const fieldName = field.getAttribute('name');
      let fieldValue = field.getAttribute('value');
      if (fieldValue.includes('{')) {
        fieldValue = JSON.parse(fieldValue);
      }
      data[fieldName] = fieldValue;
    }
    return data;
  }

  return {
    registerField,
    handleSubmit: onSubmit,
  };
}
