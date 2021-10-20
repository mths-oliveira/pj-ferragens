import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlProps,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { FieldRef } from '../../utils/hooks/useForm';

interface FieldProps extends FormControlProps {
  label: string;
  name: string;
  isDisabled?: boolean;
  defaultValue?: string;
  children: ReactNode;
  helperText?: string;
  fieldRef?: (field: FieldRef) => void;
}

export function Field({
  children,
  fieldRef,
  label,
  isDisabled,
  defaultValue,
  helperText,
  ...rest
}: FieldProps) {
  const [value, setValue] = useState(defaultValue || '');

  return (
    <FormControl
      ref={fieldRef}
      value={isDisabled ? '' : value}
      isDisabled={isDisabled}
      opacity={isDisabled ? 0.5 : 1}
      color="gray.md"
      fontWeight="500"
      onChange={(event) => {
        const input = event.target as HTMLInputElement;
        setValue(input.value);
      }}
      onBlur={(event) => {
        const input = event.target as HTMLInputElement;
        setValue(input.value);
      }}
      {...rest}
    >
      <FormLabel>{label}</FormLabel>
      {children}
      {helperText && (
        <FormHelperText marginBottom="0.25rem">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
