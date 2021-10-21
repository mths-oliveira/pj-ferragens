import { transporter } from '../../config/nodemailer';
import { Customer } from '../entities/customer';
import { Product } from '../entities/product';

import { createCustomerEmail } from '../views/customer-email';

export class SendCustomerEmailService {
  async handle(customer: Customer, products: Product[]) {
    const html = createCustomerEmail(customer, products);
    await transporter.sendMail({
      subject: 'Contato através do site: www.pjferragens.com.br',
      to: process.env.RECIPIENT_EMAIL,
      replyTo: customer.email,
      html,
    });
  }
}
