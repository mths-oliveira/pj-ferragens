import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';

export function Heading({ children, ...rest }: HeadingProps) {
  return (
    <ChakraHeading fontSize={['lg', 'xl']} color="gray.dk" {...rest}>
      {children}
    </ChakraHeading>
  );
}
