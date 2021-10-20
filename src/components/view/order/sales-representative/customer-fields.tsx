import { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { Customer } from './index';
import { FieldRef } from '../../../../utils/hooks/useForm';
import { Field } from '../../../form/field';
import { Input } from '../../../form/input';
import { List } from '../../../list';
import { ListItem } from '../../../list/list-item';
import { isEmpty } from '../../../../utils/is-empty';
import { CNPJMask } from '../../../../utils/mask/cnpj';
import { CPFMask } from '../../../../utils/mask/cpf';
import { capitalize } from '../../../../utils/mask/capitalize';
import { api } from '../../../../config/api';

interface CustomerFieldGroupProps {
  fieldRef: (field: FieldRef) => void;
}

export function CustomerFields({ fieldRef }: CustomerFieldGroupProps) {
  const [customers, setcustomers] = useState<Customer[]>([]);
  const [customer, setcustomer] = useState({} as Customer);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    api.get<Customer[]>('/customers').then((response) => {
      setcustomers(response.data);
    });
  }, []);

  function filterCustomersByName(name: string) {
    let filteredCustomers = [];
    if (name) {
      filteredCustomers = customers.filter((customer) => {
        customer.name = customer.name.toLowerCase();
        return customer.name.includes(name);
      });
    }
    return filteredCustomers;
  }

  function handleInputChange(fieldName: string, fieldValue: string) {
    setcustomer({
      ...customer,
      [fieldName]: fieldValue,
    });
  }

  return (
    <Stack
      name="customer"
      spacing="1rem"
      ref={fieldRef}
      value={JSON.stringify(customer)}
    >
      <Field name="name" label="Nome" position="relative">
        <Input
          name="name"
          value={customer.name || ''}
          onChange={(event) => {
            const input = event.currentTarget;
            handleInputChange(input.name, capitalize(input.value));
            const Customers = filterCustomersByName(input.value.toLowerCase());
            setFilteredCustomers(Customers);
          }}
        />
        {!isEmpty(filteredCustomers) && (
          <List
            position="absolute"
            left="0"
            right="0"
            top="calc(100% + 1rem)"
            zIndex="100"
            maxHeight="13rem"
            boxShadow="lg"
          >
            {filteredCustomers.map((customer) => (
              <ListItem
                key={customer.id}
                onClick={() => {
                  setcustomer(customer);
                  setFilteredCustomers([]);
                }}
              >
                {customer.name}
              </ListItem>
            ))}
          </List>
        )}
      </Field>
      <Field name="email" label="E-mail">
        <Input
          name="email"
          type="email"
          value={customer.email || ''}
          onChange={(event) => {
            const input = event.currentTarget;
            handleInputChange(input.name, input.value);
          }}
        />
      </Field>
      <Field name="id" label="CPF ou CNPJ">
        <Input
          name="id"
          value={customer.id || ''}
          minLength={14}
          maxLength={18}
          onChange={(event) => {
            const input = event.currentTarget;
            const mask = input.value.length > 14 ? CNPJMask : CPFMask;
            handleInputChange(input.name, mask(input.value));
          }}
        />
      </Field>
    </Stack>
  );
}
