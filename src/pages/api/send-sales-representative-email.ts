import { NextApiRequest, NextApiResponse } from 'next';
import { Customer } from '../../backend/entities/customer';
import { User } from '../../backend/entities/user';
import {
  Order,
  SendSalesRepresentativeEmailService,
} from '../../backend/services/send-sales-representative-email-service';

interface RequestBody {
  order: Order;
  salesRepresentative: User;
  customer: Customer;
}

const sendSalesRepresentativeEmailService =
  new SendSalesRepresentativeEmailService();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { customer, order, salesRepresentative }: RequestBody = req.body;
  try {
    sendSalesRepresentativeEmailService.handle(
      customer,
      order,
      salesRepresentative
    );
    return res.status(200).end();
  } catch (err) {
    return res.status(404).end();
  }
}
