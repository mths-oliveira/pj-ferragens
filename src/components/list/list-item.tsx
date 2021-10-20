import { Text, TextProps } from '@chakra-ui/react';

interface Props extends TextProps {}

export function ListItem({ children, ...rest }: Props) {
  return (
    <Text
      as="li"
      fontSize="sm"
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      padding="0.75rem 1.5rem"
      flexShrink={0}
      cursor="pointer"
      bg="white"
      _hover={{
        bg: 'gray.lg',
        textDecoration: 'underline',
      }}
      {...rest}
    >
      {children}
    </Text>
  );
}
