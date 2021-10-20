import { Stack, Text } from '@chakra-ui/react';
import { Form } from '../../../components/form';
import { Input } from '../../form/input';
import { Wrapper } from '../../../components/layout/wrapper';
import { Field } from '../../../components/form/field';
import { SubmitButton } from '../../../components/form/submit-button';
import { Heading } from '../../../components/heading';
import { useForm } from '../../../utils/hooks/useForm';
import { capitalize } from '../../../utils/mask/capitalize';
import { defaultToastOptions, useToast } from '../../../utils/hooks/useToast';
import { useState } from 'react';
import { api } from '../../../config/api';
import { useShoppingCartContext } from '../../../contexts/shopping-cart';
import { Spiner } from '../../spiner';

interface OrderProps {
  email: string;
  password: string;
}

export function OrderCustomer() {
  const form = useForm<OrderProps>(handleSubmit);
  const createToast = useToast(defaultToastOptions);
  const shoppingCart = useShoppingCartContext();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(customer: OrderProps) {
    setIsLoading(true);
    const response = await api.post('/send-customer-email', {
      customer,
      products: shoppingCart.products,
    });
    response.status === 200
      ? createToast({
          status: 'success',
          title: 'Solicitação feita com sucesso',
          description:
            'Você receberá o seu orçamento por e-mail, por favor, verifique sua caixa de spam e outros filtros.',
        })
      : createToast({
          status: 'error',
          title: 'Erro ao solicitar orçamento',
          description:
            'Estamos enfrentando problemas para enviar seu pedido de orçamento, tente novamente mais tarde.',
        });
    setIsLoading(false);
  }

  return (
    <Wrapper>
      <Form
        onSubmit={form.handleSubmit}
        color="gray.dk"
        maxWidth="22.5rem"
        padding="0.5rem"
      >
        <Stack spacing="2.25rem">
          <Stack spacing="1rem">
            <Heading>Orçamento</Heading>
            <Text fontSize="sm" fontWeight="500">
              Você receberá o seu orçamento por e-mail, para isso, preencha os
              campos a seguir
            </Text>
          </Stack>
          <Stack spacing="1rem" marginTop="1.5rem">
            <Field label="Nome" name="name" fieldRef={form.registerField}>
              <Input
                type="text"
                onChange={(event) => {
                  const input = event.currentTarget;
                  input.value = capitalize(input.value);
                }}
              />
            </Field>
            <Field label="E-mail" name="email" fieldRef={form.registerField}>
              <Input type="email" />
            </Field>
          </Stack>
          <SubmitButton fontSize="1.25rem">
            {isLoading ? <Spiner /> : 'Solicitar orçamento'}
          </SubmitButton>
        </Stack>
      </Form>
    </Wrapper>
  );
}
