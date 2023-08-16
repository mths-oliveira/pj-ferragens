import type { NextApiRequest, NextApiResponse } from "next"
import { ProductRepository } from "../../backend/repositories/products"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const category = (req.query.category as string) || ""
  const productRepository = new ProductRepository()
  const products = await productRepository.find(category)
  return res.status(200).json(products)
}
