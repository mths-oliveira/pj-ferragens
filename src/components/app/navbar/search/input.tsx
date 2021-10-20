import { Stack, Input, InputProps } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { Icon } from '../../../icon';

interface SearchInputProps extends InputProps {
  onClick?: () => void;
}

export function SearchInput({ onClick, ...rest }: SearchInputProps) {
  return (
    <Stack
      bg="white"
      direction="row"
      spacing="1rem"
      padding="0.5rem 1.5rem"
      alignItems="center"
      borderRadius="sm"
    >
      <Input
        size="lg"
        fontSize="sm"
        padding="0"
        border="none"
        _focus={{}}
        {...rest}
      />
      <Icon as={MdSearch} width="2.25rem" onClick={onClick} />
    </Stack>
  );
}
