import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface IconProps extends ChakraIconProps {
  as: IconType;
}

export function Icon({ as, ...rest }: IconProps) {
  return <ChakraIcon as={as} fontSize="1.5rem" {...rest} />;
}
