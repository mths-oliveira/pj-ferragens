import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react"
import { createContext, useContext, ReactNode, useState } from "react"
import { Product } from "../backend/entities/product"

interface SelectedProductProps {
  children: ReactNode
}

interface Context {
  productModal: UseDisclosureProps
  selectedProduct: Product
  setSelectedProduct: (product: Product) => void
}

const SelectedProductContext = createContext<Context>({} as any)

export function SelectedProductContextProvider({
  children,
}: SelectedProductProps) {
  const productModal = useDisclosure()
  const [selectedProduct, setSelectedProduct] = useState<Product>(null)

  return (
    <SelectedProductContext.Provider
      value={{ selectedProduct, setSelectedProduct, productModal }}
    >
      {children}
    </SelectedProductContext.Provider>
  )
}

export function useSelectedProductContext() {
  const selectedProduct = useContext(SelectedProductContext)
  return selectedProduct
}
