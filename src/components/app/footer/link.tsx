import { Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
}

export function Link({ children, ...rest }: LinkProps) {
  return (
    <Stack
      as="a"
      target="_blank"
      direction="row"
      spacing="1rem"
      _hover={{
        textDecoration: 'underline',
        color: 'primary',
      }}
      {...rest}
    >
      {children}
    </Stack>
  );
}
