import { Stack, Avatar, Text } from '@chakra-ui/react';
import { Form } from '../../../form';
import { SubmitButton } from '../../../form/submit-button';
import { useUserContext } from '../../../../contexts/user';

export function SignOut() {
  const userContext = useUserContext();

  function handleSubmit() {
    userContext.setUser(null);
    userContext.setAuthenticationScreen('SIGN_IN');
  }

  return (
    <Form color="gray.dk" onSubmit={handleSubmit}>
      <Stack spacing="2.25rem">
        <Stack alignItems="center">
          <Avatar
            name={userContext.user?.name}
            bg="white"
            size="xl"
            color="gray.md"
            boxShadow="lg"
          />
          <Text fontSize="md" fontWeight="bold" transform="translateY(0.5rem)">
            {userContext.user?.name}
          </Text>
          <Text
            fontSize="sm"
            fontWeight="500"
            color="blue.600"
            textDecoration="underline"
          >
            {userContext.user?.email}
          </Text>
        </Stack>
        <SubmitButton fontSize="1.25rem">Sair</SubmitButton>
      </Stack>
    </Form>
  );
}
