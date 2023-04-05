import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"
import { Product } from "../backend/entities/product"
import { api } from "../config/api"

import { SelectedProductContextProvider } from "./selected-product"

interface ProductsProps {
  children: ReactNode
}

const ProductsContext = createContext([] as Product[])

export function ProductsContextProvider({ children }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ;(async () => {
      const products = await getApiProducts()
      setProducts(products)
    })()
  }, [])

  async function getApiProducts() {
    const response = await api.get<Product[]>("/products")

    return response.data
  }

  return (
    <ProductsContext.Provider value={products}>
      <SelectedProductContextProvider>
        {children}
      </SelectedProductContextProvider>
    </ProductsContext.Provider>
  )
}

export function useProductsContext() {
  const products = useContext(ProductsContext)
  return products
}
