import { CustomersRepository } from './../../backend/repositories/customers';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, id, name } = req.body;
  const customersRepository = new CustomersRepository();
  const customers = await customersRepository.findAll();
  if (req.method === 'GET') {
    return res.json(customers);
  }
  const customer = customers.find((customer) => {
    return customer.id === id;
  });
  if (!customer) {
    await customersRepository.save({ email, id, name });
  }
  return res.status(200).end();
}
