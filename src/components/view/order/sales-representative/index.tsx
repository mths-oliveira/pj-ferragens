import { Stack, Radio, Center } from '@chakra-ui/react';
import { Form } from '../../../../components/form';
import { Wrapper } from '../../../../components/layout/wrapper';
import { Field } from '../../../../components/form/field';
import { SubmitButton } from '../../../../components/form/submit-button';
import { Heading } from '../../../../components/heading';
import { useForm } from '../../../../utils/hooks/useForm';
import { RadioGroup } from '../../../form/radio-group';
import { useShoppingCartContext } from '../../../../contexts/shopping-cart';
import { Textarea } from '../../../form/text-area';
import { Input } from '../../../form/input';
import { useEffect, useState } from 'react';
import { Spiner } from '../../../spiner';
import { Divider } from '../../../divider';
import { CustomerFields } from './customer-fields';
import {
  defaultToastOptions,
  useToast,
} from '../../../../utils/hooks/useToast';
import { useUserContext } from '../../../../contexts/user';
import { currency } from '../../../../utils/mask/currency';
import { api } from '../../../../config/api';
import { Order } from '../../../../backend/services/send-sales-representative-email-service';

export interface Customer {
  id: string;
  name: string;
  email: string;
}

interface OrderSalesRepresentative {
  customer: Customer;
  term: string;
  method: string;
  observation: string;
}

export function OrderSalesRepresentative() {
  const shoppingCart = useShoppingCartContext();
  const [subtotal, setSubtotal] = useState(shoppingCart.subtotal);
  const [installments, setInstallments] = useState(1);
  const [isTheDiscountEnabled, setITheDiscountEnabled] = useState(true);
  const [isTheBoletoEnabled, setIsTheBoletoEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useUserContext();
  const createToast = useToast(defaultToastOptions);
  const form = useForm(handleSubmit);

  async function handleSubmit({
    customer,
    method,
    observation,
    term,
  }: OrderSalesRepresentative) {
    setIsLoading(true);
    const order: Order = {
      method,
      observation,
      term,
      subtotal: `${installments > 1 ? `${installments}x` : ''} ${currency(
        subtotal
      )}`,
      products: shoppingCart.products,
    };
    const response = await api.post('/send-sales-representative-email', {
      salesRepresentative: userContext.user,
      customer,
      order,
    });
    if (response.status === 200) {
      createToast({
        status: 'success',
        title: 'Pedido emitido com sucesso',
        description: 'O cliente receberá uma cópia do pedido por e-mail.',
      });
      shoppingCart.clear();
    } else {
      createToast({
        status: 'error',
        title: 'Erro ao emitir o pedido',
        description:
          'Estamos enfrentando problemas para enviar seu pedido. Por favor, tente novamente mais tarde.',
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    shoppingCart.subscribe(enableBoleto);
  }, []);

  useEffect(enableBoleto, [shoppingCart.subtotal]);

  function enableBoleto() {
    setIsTheBoletoEnabled(shoppingCart.subtotal >= 400);
  }

  function handleInstallments(term: string) {
    let installments = 0;
    for (const times of term.split('/')) {
      if (times) {
        installments += 1;
      }
    }
    setInstallments(installments || 1);
    if (installments > 0) {
      setSubtotal(shoppingCart.subtotal / installments);
    }
  }

  function handleDiscount(value: number) {
    const discount = value * (shoppingCart.subtotal / 100);
    setSubtotal(shoppingCart.subtotal - discount);
  }

  function resetInstallments() {
    setSubtotal(shoppingCart.subtotal);
    setInstallments(1);
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
          <Heading whiteSpace="nowrap">Emissão de pedido</Heading>
          <Stack spacing="1rem">
            <Heading as="h3" fontSize="md">
              informações do Cliente
            </Heading>
            <CustomerFields fieldRef={form.registerField} />
            <Divider />
            <Heading as="h3" fontSize="md">
              informações do Pedido
            </Heading>
            <Field
              label="Forma de pagamento"
              name="method"
              defaultValue="Dinheiro"
              fieldRef={form.registerField}
            >
              <RadioGroup defaultValue="Dinheiro">
                <Radio value="Dinheiro">Dinheiro</Radio>
                <Radio value="Cheque">Cheque</Radio>
                <Radio value="Boleto Bancário" isDisabled={!isTheBoletoEnabled}>
                  Boleto Bancário
                </Radio>
                <Radio value="Pagamento por PIX">Pagamento por PIX</Radio>
                <Radio value="Transferência Bancária">
                  Transferência Bancária
                </Radio>
                <Radio value="Outros">Outros</Radio>
              </RadioGroup>
            </Field>
            <Field
              label="Prazo"
              name="term"
              defaultValue="À vista"
              helperText="Exemplo: 30/60/90"
              fieldRef={form.registerField}
            >
              <Input
                defaultValue="À vista"
                onChange={(event) => {
                  const input = event.currentTarget;
                  input.value = input.value
                    .replace(/[^0-9\/]/g, '')
                    .replace(/\/{2,}/g, '/');
                  handleInstallments(input.value);
                }}
                onFocus={(event) => {
                  const input = event.currentTarget;
                  input.value = '';
                }}
                onBlur={(event) => {
                  const input = event.currentTarget;
                  if (!input.value) {
                    input.value = input.defaultValue;
                    resetInstallments();
                  }
                  setITheDiscountEnabled(input.value === input.defaultValue);
                }}
              />
            </Field>
            <Field
              label="Desconto"
              name="discount"
              helperText="Somente à vista"
              isDisabled={!isTheDiscountEnabled}
            >
              <Input
                isRequired={false}
                isDisabled={!isTheDiscountEnabled}
                onChange={(event) => {
                  const input = event.currentTarget;
                  let value = Number(input.value.replace(/\D/g, ''));
                  if (value > 100) value = 100;
                  input.value = String(value);
                  handleDiscount(value);
                }}
                onFocus={(event) => {
                  const input = event.currentTarget;
                  input.defaultValue = input.value.replace(/\D/g, '');
                  input.value = '';
                }}
                onBlur={(event) => {
                  const input = event.currentTarget;
                  const value = input.value || input.defaultValue;
                  input.value = Number(value) > 0 ? `${value}%` : '';
                }}
              />
            </Field>
            <Field
              label="Observação"
              name="observation"
              fieldRef={form.registerField}
            >
              <Textarea
                onKeyPress={(event) => {
                  const textArea = event.currentTarget;
                  if (textArea.value) return;
                  textArea.value = event.key.toUpperCase();
                  event.preventDefault();
                }}
              />
            </Field>
          </Stack>
          <Center fontWeight="500" fontSize="md">
            Subtotal:{' '}
            {`${installments > 1 ? `${installments}x` : ''} ${currency(
              subtotal
            )}`}
          </Center>
          <SubmitButton fontSize="1.25rem">
            {isLoading ? <Spiner /> : 'Emitir pedido'}
          </SubmitButton>
        </Stack>
      </Form>
    </Wrapper>
  );
}
