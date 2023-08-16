import { transporter } from "../../config/nodemailer"
import { Product } from "../../contexts/shopping-cart"
import { Customer } from "../entities/customer"

import { createCustomerEmail } from "../views/customer-email"

export class SendCustomerEmailService {
  async handle(customer: Customer, products: Product[]) {
    const html = createCustomerEmail(customer, products)
    await transporter.sendMail({
      subject: "Contato através do site: www.pjferragens.com.br",
      to: process.env.RECIPIENT_EMAIL,
      replyTo: customer.email,
      html,
    })
  }
}
