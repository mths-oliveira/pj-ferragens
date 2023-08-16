import {
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSelectedProductContext } from "../../contexts/selected-product"
import { useShoppingCartContext } from "../../contexts/shopping-cart"
import { currencyMask } from "../../utils/currency-mask"
import { NumberInput } from "../number-input"

export function ProductModal() {
  const {
    products,
    setProducts,
    onOpen: openShoppingCart,
  } = useShoppingCartContext()
  const { selectedProduct: product } = useSelectedProductContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [amount, setAmount] = useState(1)
  useEffect(onOpen, [product])

  return (
    product && (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent bg="transparent" borderRadius="5px" overflow="hidden">
          <ModalBody bg="#fff" padding="2.25rem 1.5rem" borderRadius="5px">
            <Flex
              as="form"
              flexDirection="column"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <Image
                src={product.image}
                margin="auto"
                height="10rem"
                objectFit="contain"
                marginBottom="2.25rem"
              />
              <Table
                variant="unstyled"
                fontWeight="bold"
                sx={{
                  ">tbody>tr>td": {
                    padding: "0.75rem 1.5rem",
                  },
                }}
              >
                <Tbody>
                  <Tr>
                    <Td>Refêrencia</Td>
                    <Td>#{product.ref}</Td>
                  </Tr>
                  <Tr>
                    <Td>Valor</Td>
                    <Td>{currencyMask(product.price)}</Td>
                  </Tr>
                  <Tr>
                    <Td>Quantidade</Td>
                    <Td>
                      <NumberInput
                        onChange={(amount) => {
                          setAmount(amount)
                        }}
                      />
                    </Td>
                  </Tr>
                  <Tr
                    sx={{
                      ">td>hr": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Td>
                      <Divider />
                    </Td>
                    <Td>
                      <Divider />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Subtotal</Td>
                    <Td>{currencyMask(product.subtotal)}</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Button
                type="submit"
                marginTop="1.5rem"
                bg="primary"
                color="white"
                _hover={{}}
                onClick={() => {
                  const i = products.findIndex(({ ref }) => {
                    return product.ref === ref
                  })
                  if (i === -1) {
                    product.amount = amount
                    setProducts([...products, product])
                  } else {
                    products[i].amount += amount
                    setProducts(products)
                  }
                  onClose()
                  setAmount(1)
                  openShoppingCart()
                }}
              >
                Adicionar ao carrinho
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  )
}
