import { SignIn } from './sign-in';
import { SignUp } from './sign-up';
import { SignOut } from './sign-out';
import { Modal, DisclosureProps } from '../../../modal';
import { CloseButton } from '../../../close-button';
import { useUserContext } from '../../../../contexts/user';

const childrens = {
  SIGN_IN: <SignIn />,
  SIGN_UP: <SignUp />,
  SIGN_OUT: <SignOut />,
};

export function Authentication({ isOpen, onClose }: DisclosureProps) {
  const userContext = useUserContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <CloseButton onClick={onClose} />
      {childrens[userContext.authenticationScreen]}
    </Modal>
  );
}
