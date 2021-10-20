import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Product } from '../backend/entities/product';
import { useRouter } from '../utils/hooks/useRouter';
import { useProductsContext } from './products';

interface SelectedProductProps {
  children: ReactNode;
}

const product = new Product('', '', '', '', 0, false);
const SelectedProductContext = createContext(product);

export function SelectedProductContextProvider({
  children,
}: SelectedProductProps) {
  const router = useRouter();
  const products = useProductsContext();
  const [selectedProduct, setSelectedProduct] = useState<Product>(null);

  useEffect(() => {
    const product = findProductByRef(router.query.ref);
    setSelectedProduct(product);
  }, [router.query.ref]);

  function findProductByRef(ref: string) {
    const product = products.find((product) => {
      return product.ref === ref;
    });
    return product;
  }

  return (
    <SelectedProductContext.Provider value={selectedProduct}>
      {children}
    </SelectedProductContext.Provider>
  );
}

export function useSelectedProductContext() {
  const selectedProduct = useContext(SelectedProductContext);
  return selectedProduct;
}
