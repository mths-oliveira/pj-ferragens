import { transporter } from "../../config/nodemailer"
import { Product } from "../../contexts/shopping-cart"
import { Customer } from "../entities/customer"
import { User } from "../entities/user"
import { createSalesRepresentativeEmail } from "../views/sales-representative-email"

export interface Order {
  products: Product[]
  method: string
  observation: string
  term: string
  subtotal: string
}

export class SendSalesRepresentativeEmailService {
  async handle(customer: Customer, order: Order, salesRepresentative: User) {
    const html = createSalesRepresentativeEmail(
      customer,
      order,
      salesRepresentative
    )
    await transporter.sendMail({
      subject: "Contato através do site: www.pjferragens.com.br",
      to: [process.env.RECIPIENT_EMAIL, customer.email],
      replyTo: customer.email,
      html,
    })
  }
}
