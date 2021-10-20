import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  ModalBodyProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface DisclosureProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DrawerProps extends DisclosureProps, ModalBodyProps {
  children?: ReactNode;
  placement: 'left' | 'right';
}

export function Drawer({
  isOpen,
  onClose,
  children,
  placement,
  ...rest
}: DrawerProps) {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      placement={placement}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody padding="0" {...rest}>
          {children}
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
}
