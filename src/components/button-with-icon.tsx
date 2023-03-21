import { Center, CenterProps } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import { Icon } from './icon';

interface ButtonProps extends CenterProps {
  icon: IconType;
}

export function ButtonWithIcon({ icon, children, ...rest }: ButtonProps) {
  return (
    <Center
      as="button"
      paddingX="1rem"
      fontSize="1.5rem"
      color="gray.md"
      bg="white"
      {...rest}
    >
      <Icon as={icon} />
      {children}
    </Center>
  );
}
