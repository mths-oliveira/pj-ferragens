import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props extends TextareaProps {}

export function Textarea({ ...rest }: Props) {
  return (
    <ChakraTextarea
      rows={3}
      bg="gray.lg"
      border="none"
      resize="none"
      fontWeight="500"
      data-value={8}
      fontSize="xs"
      _focus={{
        boxShadow: 'outline',
      }}
      style={{
        height: 'auto',
      }}
      {...rest}
    />
  );
}
