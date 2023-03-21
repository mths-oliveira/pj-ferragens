import { FormEvent, FormEventHandler, KeyboardEvent } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface FormProps extends BoxProps {
  onSubmit: FormEventHandler<HTMLDivElement>;
}

export function Form({ children, onSubmit, ...rest }: FormProps) {
  function handleSubmit(event: FormEvent<HTMLDivElement & HTMLFormElement>) {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      onSubmit(event);
    }
  }

  return (
    <Box
      as="form"
      bg="white"
      padding="2.25rem"
      borderRadius="sm"
      overflow="hidden"
      onSubmit={handleSubmit}
      {...rest}
    >
      {children}
    </Box>
  );
}
