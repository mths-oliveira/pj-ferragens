import { OrderCustomer } from '../components/view/order/customer';
import { OrderSalesRepresentative } from '../components/view/order/sales-representative';
import { useUserContext } from '../contexts/user';

export default function Order() {
  const userContext = useUserContext();
  return userContext.user ? <OrderSalesRepresentative /> : <OrderCustomer />;
}
