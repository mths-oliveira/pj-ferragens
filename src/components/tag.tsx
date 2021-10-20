import { Flex } from '@chakra-ui/react';

interface TagProps {
  children: string;
}

export function Tag({ children }: TagProps) {
  return (
    <Flex
      as="p"
      height="3rem"
      width="100%"
      padding="1.25rem"
      alignItems="center"
      borderRadius="sm"
      boxShadow="md"
      fontSize="sm"
      whiteSpace="nowrap"
    >
      {children}
    </Flex>
  );
}
