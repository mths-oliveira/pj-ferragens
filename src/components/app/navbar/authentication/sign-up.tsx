import { Stack } from '@chakra-ui/react';
import { Form } from '../../../form';
import { Heading } from '../../../heading';
import { Field } from '../../../form/field';
import { SubmitButton } from '../../../form/submit-button';
import { AlternativeAction } from '../../../form/alternative-action';
import { useForm } from '../../../../utils/hooks/useForm';
import { capitalize } from '../../../../utils/mask/capitalize';
import { Input } from '../../../form/input';
import { api } from '../../../../config/api';
import {
  defaultToastOptions,
  useToast,
} from '../../../../utils/hooks/useToast';
import { useUserContext } from '../../../../contexts/user';
import { User } from '../../../../backend/entities/user';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  code: string;
}

export function SignUp() {
  const form = useForm<SignUpProps>(handleSubmit);
  const createToast = useToast(defaultToastOptions);
  const userContext = useUserContext();

  async function handleSubmit({ code, email, name, password }: SignUpProps) {
    const response = await api.post<User>('/sign-up', {
      code,
      email,
      name,
      password,
    });
    if (response.status !== 200) {
      createToast({
        title: 'Erro',
        status: 'error',
        description: response.data,
      });
      return;
    }
    userContext.setUser(response.data);
  }

  function handleClick() {
    userContext.setAuthenticationScreen('SIGN_IN');
  }

  return (
    <Form color="gray.dk" onSubmit={form.handleSubmit}>
      <Stack spacing="2.25rem">
        <Heading>Registre-se</Heading>
        <Stack spacing="1rem">
          <Field
            label="Nome"
            name="name"
            helperText="Digite seu nome completo"
            fieldRef={form.registerField}
          >
            <Input
              type="text"
              onChange={(event) => {
                const input = event.currentTarget;
                input.value = capitalize(input.value);
              }}
            />
          </Field>
          <Field
            label="E-mail"
            name="email"
            helperText="Digite seu melhor e-mail"
            fieldRef={form.registerField}
          >
            <Input type="email" />
          </Field>
          <Field
            label="Senha"
            name="password"
            helperText="Mínimo 8 caracteres"
            fieldRef={form.registerField}
          >
            <Input type="password" minLength={8} />
          </Field>
          <Field
            label="Código de segurança"
            name="code"
            helperText="(Somente pessoal autorizado)"
            fieldRef={form.registerField}
          >
            <Input type="password" minLength={8} />
          </Field>
        </Stack>
        <AlternativeAction
          onClick={handleClick}
          motivationalText="Já tem uma conta?"
        >
          Entrar
        </AlternativeAction>
        <SubmitButton fontSize="1.25rem">Cadastrar-se</SubmitButton>
      </Stack>
    </Form>
  );
}
