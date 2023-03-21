import { Stack } from '@chakra-ui/react';
import { Form } from '../../../form';
import { Heading } from '../../../heading';
import { Field } from '../../../form/field';
import { SubmitButton } from '../../../form/submit-button';
import { Input } from '../../../form/input';
import { AlternativeAction } from '../../../form/alternative-action';
import { api } from '../../../../config/api';
import { useForm } from '../../../../utils/hooks/useForm';
import {
  useToast,
  defaultToastOptions,
} from '../../../../utils/hooks/useToast';
import { useUserContext } from '../../../../contexts/user';
import { User } from '../../../../backend/entities/user';
import { Spiner } from '../../../spiner';
import { useState } from 'react';

interface SignInProps {
  email: string;
  password: string;
}

export function SignIn() {
  const form = useForm<SignInProps>(handleSubmit);
  const createToast = useToast(defaultToastOptions);
  const userContext = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit({ email, password }: SignInProps) {
    setIsLoading(true);
    const response = await api.post<User>('/sign-in', {
      email,
      password,
    });
    if (response.status === 404) {
      createToast({
        title: 'Erro',
        status: 'error',
        description: response.data,
      });
    } else {
      createToast({
        title: 'Sucesso',
        status: 'success',
        description: `Olá, ${response.data.name}`,
      });
      userContext.setUser(response.data);
    }
    setIsLoading(false);
  }

  function handleClick() {
    userContext.setAuthenticationScreen('SIGN_UP');
  }

  return (
    <Form color="gray.dk" onSubmit={form.handleSubmit}>
      <Stack spacing="2.25rem">
        <Heading>Entrar</Heading>
        <Stack spacing="1rem">
          <Field label="E-mail" name="email" fieldRef={form.registerField}>
            <Input type="email" />
          </Field>
          <Field label="Senha" name="password" fieldRef={form.registerField}>
            <Input type="password" />
          </Field>
        </Stack>
        <AlternativeAction
          onClick={handleClick}
          motivationalText="Não tem uma conta?"
        >
          Registre-se
        </AlternativeAction>
        <SubmitButton fontSize="1.25rem">
          {isLoading ? <Spiner /> : 'Entrar'}
        </SubmitButton>
      </Stack>
    </Form>
  );
}
