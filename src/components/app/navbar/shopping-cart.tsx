import { useEffect } from "react"
import { SimpleGrid, Text, Stack, Image, Box } from "@chakra-ui/react"
import { Tag } from "../../tag"
import { Form } from "../../form"
import { Button } from "../../button"
import { Divider } from "../../divider"
import { Drawer, DisclosureProps } from "../../drawer"
import { SubmitButton } from "../../form/submit-button"
import { currency } from "../../../utils/mask/currency"
import { NumberInput } from "../../form/number-input"
import { useShoppingCartContext } from "../../../contexts/shopping-cart"
import { isEmpty } from "../../../utils/is-empty"
import { useRender } from "../../../utils/hooks/useRender"
import { useRouter } from "../../../utils/hooks/useRouter"
import { useStorage } from "../../../utils/hooks/useStorage"
import { Product } from "../../../backend/entities/product"
import { serializeProducts } from "../../../utils/serialize-products"

interface ShoppingCartProps extends DisclosureProps {
  onOpen: () => void
}

export function ShoppingCart({ isOpen, onClose, onOpen }: ShoppingCartProps) {
  const render = useRender()
  const router = useRouter()
  const shoppingCart = useShoppingCartContext()
  const shoppingCartStorage = useStorage<Product[]>("shopping-cart")

  useEffect(() => {
    const storageProducts = shoppingCartStorage.find()
    shoppingCart.products = serializeProducts(storageProducts)
    shoppingCart.subscribe(render)
    shoppingCart.subscribe((products) => {
      !products || isEmpty(products) ? onClose() : onOpen()
    })
  }, [])

  useEffect(() => {
    shoppingCartStorage.save(shoppingCart.products)
  }, [isOpen])

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      fontSize="sm"
      color="gray.md"
      fontWeight="bold"
    >
      <Box as="header" position="sticky" top="0" zIndex="100" bg="white">
        <Form
          onSubmit={() => {
            router.setPath("/pedidos")
            onClose()
          }}
        >
          <Stack spacing="1rem">
            <Text whiteSpace="nowrap" textAlign="center">
              Subtotal: {currency(shoppingCart.subtotal)}
            </Text>
            <SubmitButton disabled={isEmpty(shoppingCart.products)}>
              Fechar pedido
            </SubmitButton>
          </Stack>
        </Form>
        <Divider />
      </Box>
      <Stack
        as="ul"
        spacing="2.25rem"
        padding="0.75rem"
        paddingBottom="2.25rem"
      >
        {shoppingCart.products.map((product) => (
          <SimpleGrid
            key={product.ref}
            as="li"
            column={2}
            color="gray.md"
            spacing="1rem 0.75rem"
          >
            <Stack
              direction="row"
              spacing="0.75rem"
              gridColumn="span 2"
              maxHeight="4.5rem"
            >
              <Image src={product.image} width="25%" objectFit="contain" />
              <Text fontSize="xs" fontWeight="400" overflow="auto">
                {product.description}
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="xs">Refêrencia</Text>
              <Tag>{product.ref}</Tag>
            </Stack>
            <Stack>
              <Text fontSize="xs">Valor</Text>
              <Tag>{currency(product.price)}</Tag>
            </Stack>
            <Stack>
              <Text fontSize="xs">Quantidade</Text>
              <NumberInput
                initialValue={product.amount}
                onChangeValue={(value) => {
                  product.amount = value
                  render()
                }}
              />
            </Stack>
            <Stack>
              <Text fontSize="xs">Ações</Text>
              <Button
                onClick={() => {
                  shoppingCart.remove(product.ref)
                }}
              >
                Remover
              </Button>
            </Stack>
          </SimpleGrid>
        ))}
      </Stack>
    </Drawer>
  )
}
