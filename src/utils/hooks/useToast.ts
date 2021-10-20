import { useToast, UseToastOptions } from '@chakra-ui/toast';

const defaultToastOptions: UseToastOptions = {
  duration: 7_500,
  isClosable: true,
  position: 'top-right',
};

export { useToast, defaultToastOptions };
