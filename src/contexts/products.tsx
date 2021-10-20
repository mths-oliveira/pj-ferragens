import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { Product } from '../backend/entities/product';
import { api } from '../config/api';
import { useStorage } from '../utils/hooks/useStorage';
import { isEmpty } from '../utils/is-empty';
import { serializeProducts } from '../utils/serialize-products';
import { SelectedProductContextProvider } from './selected-product';

interface ProductsProps {
  children: ReactNode;
}

const ProductsContext = createContext([] as Product[]);

export function ProductsContextProvider({ children }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const productsStorage = useStorage<Product[]>('products-list');

  useEffect(() => {
    (async () => {
      let products = getStorageProducts();
      if (!products || isEmpty(products)) {
        products = await getApiProducts();
      }
      setProducts(products);
    })();
  }, []);

  function getStorageProducts() {
    const storageProducts = productsStorage.find();
    const products = serializeProducts(storageProducts);
    return products;
  }

  async function getApiProducts() {
    const response = await api.get<Product[]>('/products');
    const products = serializeProducts(response.data);
    return products;
  }

  useEffect(() => {
    productsStorage.save(products);
  }, [products]);

  return (
    <ProductsContext.Provider value={products}>
      <SelectedProductContextProvider>
        {children}
      </SelectedProductContextProvider>
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const products = useContext(ProductsContext);
  return products;
}
