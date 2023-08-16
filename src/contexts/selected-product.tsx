import { createContext, useContext, ReactNode, useState } from "react"

interface Product {
  ref: string
  image: string
  description: string
  price: number
  amount: number
  subtotal: number
}

interface SelectedProductProps {
  children: ReactNode
}

interface Context {
  selectedProduct: Product
  setSelectedProduct: (product: Product) => void
}

const SelectedProductContext = createContext<Context>({} as any)

export function SelectedProductContextProvider({
  children,
}: SelectedProductProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(null)

  return (
    <SelectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct }}
    >
      {children}
    </SelectedProductContext.Provider>
  )
}

export function useSelectedProductContext() {
  const selectedProduct = useContext(SelectedProductContext)
  return selectedProduct
}
