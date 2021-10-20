import { Stack, Link, LinkProps, Text } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface AlternativeActionProps extends LinkProps {
  motivationalText?: string;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function AlternativeAction({
  children,
  motivationalText,
  onClick,
  ...rest
}: AlternativeActionProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    onClick(event);
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      fontWeight="500"
    >
      <Text>{motivationalText}</Text>
      <Link color="primary" onClick={handleClick} {...rest}>
        {children}
      </Link>
    </Stack>
  );
}
