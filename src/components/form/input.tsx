import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

interface Props extends InputProps {}

export function Input({ isDisabled, ...rest }: Props) {
  return (
    <ChakraInput
      ref={(input) => {
        if (Boolean(input) && isDisabled) {
          input.value = '';
        }
      }}
      isRequired
      size="lg"
      fontSize="xs"
      fontWeight="500"
      bg="gray.lg"
      border="none"
      _focus={{
        boxShadow: 'outline',
      }}
      {...rest}
    />
  );
}
