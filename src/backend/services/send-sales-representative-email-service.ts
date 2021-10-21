import { transporter } from '../../config/nodemailer';
import { Customer } from '../entities/customer';
import { Product } from '../entities/product';
import { User } from '../entities/user';
import { createSalesRepresentativeEmail } from '../views/sales-representative-email';

export interface Order {
  products: Product[];
  method: string;
  observation: string;
  term: string;
  subtotal: string;
}

export class SendSalesRepresentativeEmailService {
  async handle(customer: Customer, order: Order, salesRepresentative: User) {
    const html = createSalesRepresentativeEmail(
      customer,
      order,
      salesRepresentative
    );
    await transporter.sendMail({
      subject: 'Contato através do site: www.pjferragens.com.br',
      from: process.env.SENDER_EMAIL,
      to: [process.env.RECIPIENT_EMAIL, customer.email],
      replyTo: customer.email,
      html,
    });
  }
}
