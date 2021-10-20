import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface DisclosureProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalProps extends DisclosureProps {
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        bg="transparent"
        margin="0"
        boxShadow="none"
        position="relative"
      >
        <ModalBody
          padding="0"
          maxHeight="calc(100vh - 3.5rem)"
          overflowY="auto"
        >
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
