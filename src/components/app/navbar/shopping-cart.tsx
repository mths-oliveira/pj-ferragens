import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react"
import { MdShoppingCart } from "react-icons/md"
import { FaTrash } from "react-icons/fa"
import { NumberInput } from "../../number-input"
import { currencyMask } from "../../../utils/currency-mask"
import { useShoppingCartContext } from "../../../contexts/shopping-cart"
import { useRouter } from "next/router"

export function ShoppingCart() {
  const router = useRouter()
  const { products, setProducts, isOpen, onOpen, onClose } =
    useShoppingCartContext()
  let subtotal = 0
  for (const product of products) {
    const productSubtotal = product.price * product.amount
    subtotal += productSubtotal
  }

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={MdShoppingCart} />
        <Text
          padding="0.5rem"
          borderRadius="5px"
          bg="primary"
          color="#fff"
          marginLeft="0.5rem"
        >
          {String(products.length).padStart(2, "0")}
        </Text>
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxWidth="12.5rem">
          <DrawerHeader
            padding="1.5rem"
            borderBottom="1px solid rgba(0,0,0,0.1)"
          >
            <Flex flexDirection="column" alignItems="center">
              <Text fontSize="1rem">Subtotal</Text>
              <Text fontSize="1.25rem">{currencyMask(subtotal)}</Text>

              <Button
                marginTop="0.5rem"
                bg="primary"
                color="white"
                _hover={{}}
                onClick={() => {
                  const userData = localStorage.getItem("user")
                  const user = JSON.parse(userData)
                  let link = "/pedidos"
                  if (user) link += "/representante"
                  router.push(link)
                  onClose()
                }}
              >
                Fechar pedido
              </Button>
            </Flex>
          </DrawerHeader>
          <DrawerBody
            padding="0"
            sx={{
              ">div:not(:first-of-type)": {
                borderTop: "1px solid rgba(0,0,0,0.1)",
              },
            }}
          >
            {products.map((product, i) => (
              <Box key={product.ref} padding="1.5rem">
                <Image src={product.image} maxHeight="7.5rem" marginX="auto" />
                <Text fontWeight="bold" textAlign="center" marginTop="0.25rem">
                  {currencyMask(product.price)}
                </Text>
                <Flex marginTop="1rem">
                  <NumberInput
                    defaultValue={product.amount}
                    onChange={(value) => {
                      const updatedProducts = Array.from(products)
                      updatedProducts[i].amount = value
                      setProducts(updatedProducts)
                    }}
                  />
                  <Button
                    variant="outline"
                    marginLeft="1rem"
                    _hover={{
                      color: "primary",
                    }}
                    onClick={() => {
                      const updatedProducts = products.filter((_, index) => {
                        return index !== i
                      })
                      setProducts(updatedProducts)
                    }}
                  >
                    <Icon as={FaTrash} />
                  </Button>
                </Flex>
              </Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
