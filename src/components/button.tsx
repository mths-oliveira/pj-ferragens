import { Button as ChakraButton, ButtonProps as Props } from '@chakra-ui/react';

export interface ButtonProps extends Props {}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      size="lg"
      width="100%"
      bg="white"
      boxShadow="md"
      borderRadius="sm"
      fontSize="sm"
      padding="1.25rem"
      _hover={{
        bg: 'gray.lg',
      }}
      _active={{}}
      _focus={{}}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}
