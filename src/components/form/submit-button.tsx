import { Button, ButtonProps } from '../button';

interface SubmitButtonProps extends ButtonProps {}

export function SubmitButton({ children, ...rest }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      bg="primary"
      color="white"
      _hover={{
        filter: 'brightness(115%)',
      }}
      _focus={{
        filter: 'brightness(115%)',
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
