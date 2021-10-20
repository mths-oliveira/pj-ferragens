import { CircularProgress } from '@chakra-ui/react';

export function Spiner() {
  return (
    <CircularProgress
      isIndeterminate
      color="white"
      size="2rem"
      thickness="1rem"
      trackColor="transparent"
    />
  );
}
