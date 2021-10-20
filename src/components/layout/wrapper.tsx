import { Box, BoxProps } from '@chakra-ui/layout';

interface WrapperProps extends BoxProps {}

export function Wrapper({ children, ...rest }: WrapperProps) {
  return (
    <Box
      paddingX={['1.5rem', '2.25rem', '5rem', '5rem', '15rem']}
      paddingY={['2.5rem', '2.5rem', '5rem']}
      maxWidth="100%"
      overflow="hidden"
      {...rest}
    >
      {children}
    </Box>
  );
}
