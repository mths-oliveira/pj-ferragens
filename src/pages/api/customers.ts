import { CustomersRepository } from './../../backend/repositories/customers';
import { NextApiResponse } from 'next';

export default async function (_, res: NextApiResponse) {
  const customersRepository = new CustomersRepository();
  const customers = await customersRepository.findAll();
  return res.json(customers);
}
