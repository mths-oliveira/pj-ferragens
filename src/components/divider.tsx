import { Box, BoxProps } from '@chakra-ui/react';

interface DividerProps extends BoxProps {}

export function Divider({ ...rest }: DividerProps) {
  return (
    <Box>
      <Box
        height="3px"
        width="100%"
        bg="gray.lg"
        margin={'0.75rem 0'}
        {...rest}
      />
    </Box>
  );
}
