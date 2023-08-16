import { useDisclosure } from "@chakra-ui/react"
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react"

export interface Product {
  ref: string
  image: string
  description: string
  price: number
  amount: number
  subtotal: number
}

interface ShoppingCartProps {
  children: ReactNode
}

interface Context {
  products: Product[]
  setProducts: (filteredProducts: Product[]) => void
  onClose: () => void
  onOpen: () => void
  isOpen: boolean
}

const ShoppingCartContext = createContext<Context>({} as any)

export function ShoppingCartContextProvider({ children }: ShoppingCartProps) {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    const data = localStorage.getItem("products")
    const products = JSON.parse(data)
    if (!products) return
    setProducts(products)
  }, [])
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])
  return (
    <ShoppingCartContext.Provider
      value={{ products, setProducts, isOpen, onClose, onOpen }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCartContext() {
  const selectedProduct = useContext(ShoppingCartContext)
  return selectedProduct
}
