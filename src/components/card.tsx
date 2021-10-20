import { MdUnfoldMore } from 'react-icons/md';
import { Image, Text, Flex, Stack, StackProps } from '@chakra-ui/react';
import { Icon } from './icon';

interface CardProps extends StackProps {
  src: string;
  title: string;
}

export function Card({ src, title, children, ...rest }: CardProps) {
  return (
    <Stack
      width="15rem"
      padding="1.5rem"
      spacing="1.5rem"
      shadow="md"
      borderRadius="md"
      cursor="pointer"
      flexShrink={0}
      transition="all .1s ease"
      _hover={{
        shadow: 'xl',
        '&> img': {
          transform: 'scale(1.125)',
        },
        '&> span': {
          color: 'primary',
          textDecoration: 'underline',
        },
      }}
      {...rest}
    >
      <Image
        src={src}
        title={title}
        height="8.5rem"
        marginX="auto"
        objectFit="contain"
        transition="all .1s ease"
      />
      <Text cursor="text" overflowY="auto" height="4.5rem">
        {children}
      </Text>
      <Flex as="span" alignItems="flex-start" justifyContent="space-between">
        <Text fontWeight="500" fontSize="1.125rem">
          Detalhes do produto
        </Text>
        <Icon as={MdUnfoldMore} />
      </Flex>
    </Stack>
  );
}
