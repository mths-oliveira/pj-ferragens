import { NextApiResponse } from 'next';
import { ProductsRepository } from '../../backend/repositories/products';

export default async function (_, res: NextApiResponse) {
  const productsRepository = new ProductsRepository();
  const products = await productsRepository.findAll();
  return res.json(products);
}
