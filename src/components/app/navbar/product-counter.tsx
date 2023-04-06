import { Center } from "@chakra-ui/react"
import { useProductsContext } from "../../../contexts/products"

import { useShoppingCartContext } from "../../../contexts/shopping-cart"

export function ProductCounter() {
  const shoppingCart = useShoppingCartContext()
  const products = useProductsContext()
  console.log(products)
  return (
    <Center
      as="span"
      fontSize="xs"
      height="2.25rem"
      width="2.25rem"
      bg="primary"
      color="white"
      fontWeight="bold"
      borderRadius="md"
      marginLeft=".5rem"
    >
      {String(shoppingCart?.products.length).padStart(2, "0")}
    </Center>
  )
}
