import { useState } from 'react';
import {
  Stack,
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps,
} from '@chakra-ui/react';

interface RadioProps extends RadioGroupProps {}

export function RadioGroup({ children, defaultValue, ...rest }: RadioProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <ChakraRadioGroup onChange={setValue} value={value} {...rest}>
      <Stack>{children}</Stack>
    </ChakraRadioGroup>
  );
}
