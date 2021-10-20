import { Stack, Text } from '@chakra-ui/react';
import { Heading } from '../../../components/heading';

interface ArticleProps {
  title: string;
  children: string;
}

export function Article({ children, title }: ArticleProps) {
  return (
    <Stack spacing="1rem">
      <Heading>{title}</Heading>
      <Text color="gray.md" fontSize="sm">
        {children}
      </Text>
    </Stack>
  );
}
