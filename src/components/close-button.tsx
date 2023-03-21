import { CenterProps } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { ButtonWithIcon } from './button-with-icon';

interface CloseButtonProps extends CenterProps {}

export function CloseButton({ ...rest }: CloseButtonProps) {
  return (
    <ButtonWithIcon
      icon={MdClose}
      bg="white"
      color="gray.md"
      width="fit-content"
      padding="0.75rem"
      marginBottom="-3rem"
      marginLeft="auto"
      position="sticky"
      top="0"
      {...rest}
    />
  );
}
