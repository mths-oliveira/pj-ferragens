import { createGoogleClient } from '../../config/create-google-client';
import { Customer } from '../entities/customer';

export class CustomersRepository {
  async save({ id, name, email }: Customer) {
    const client = await createGoogleClient('Clientes');
    client.add([id, name, email]);
  }

  async findAll() {
    const client = await createGoogleClient('Clientes');
    const [_, ...clients] = await client.find();
    const customers = clients.map(([id, name, email]) => {
      const customer = new Customer(id, name, email);
      return customer;
    });
    return customers;
  }
}
