import { NextApiRequest, NextApiResponse } from "next"
import { Customer } from "../../backend/entities/customer"
import { SendCustomerEmailService } from "../../backend/services/send-customer-email-service"
import { Product } from "../../contexts/shopping-cart"

interface RequestBody {
  customer: Customer
  products: Product[]
}

const sendCustomerEmailService = new SendCustomerEmailService()

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { customer, products }: RequestBody = req.body
  try {
    sendCustomerEmailService.handle(customer, products)
    return res.status(200).end()
  } catch (err) {
    console.log({ err })
    return res.status(404).end()
  }
}
