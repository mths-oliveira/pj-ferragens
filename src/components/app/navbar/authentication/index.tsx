import { SignIn } from './sign-in';
import { SignUp } from './sign-up';
import { SignOut } from './sign-out';
import { Modal, DisclosureProps } from '../../../modal';
import { CloseButton } from '../../../close-button';
import { useUserContext } from '../../../../contexts/user';
import { useEffect } from 'react';

const childrens = {
  SIGN_IN: <SignIn />,
  SIGN_UP: <SignUp />,
  SIGN_OUT: <SignOut />,
};

export function Authentication({ isOpen, onClose }: DisclosureProps) {
  const userContext = useUserContext();

  useEffect(() => {
    if (userContext.authenticationScreen === 'SIGN_OUT') {
      onClose();
    }
  }, [userContext.authenticationScreen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CloseButton onClick={onClose} />
      {childrens[userContext.authenticationScreen]}
    </Modal>
  );
}
