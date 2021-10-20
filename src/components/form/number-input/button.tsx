import { MouseEvent, ReactNode } from 'react';
import { Center } from '@chakra-ui/react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  function handleClick(
    event: MouseEvent<HTMLDivElement> & MouseEvent<HTMLButtonElement>
  ) {
    const wasTriggeredByTheMouse = Boolean(event.detail);
    if (wasTriggeredByTheMouse) {
      event.preventDefault();
      onClick();
    }
  }
  return (
    <Center as="button" padding="0.375rem" onClick={handleClick}>
      {children}
    </Center>
  );
}
