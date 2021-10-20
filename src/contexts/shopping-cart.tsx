import { createContext, useContext, ReactNode } from 'react';
import { ShoppingCart } from '../core/shopping-cart';

interface ShoppingCartProps {
  children: ReactNode;
}

const shoppingCart = new ShoppingCart();
const ShoppingCartContext = createContext(shoppingCart);

export function ShoppingCartContextProvider({ children }: ShoppingCartProps) {
  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCartContext() {
  const shoppingCart = useContext(ShoppingCartContext);
  return shoppingCart;
}
