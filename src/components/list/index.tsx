import { Stack, StackProps } from '@chakra-ui/react';

interface ListProps extends StackProps {}

export function List({ children, ...rest }: ListProps) {
  return (
    <Stack
      as="ul"
      listStyleType="none"
      bg="white"
      borderRadius="sm"
      spacing="0"
      overflowY="auto"
      {...rest}
    >
      {children}
    </Stack>
  );
}
