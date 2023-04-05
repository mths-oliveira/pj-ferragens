import { useEffect } from "react"
import { useDisclosure, Image, Stack, Text, SimpleGrid } from "@chakra-ui/react"
import { Modal } from "../modal"
import { Form } from "../form"
import { Tag } from "../tag"
import { CloseButton } from "../close-button"
import { NumberInput } from "../form/number-input"
import { SubmitButton } from "../form/submit-button"
import { currency } from "../../utils/mask/currency"
import { useRender } from "../../utils/hooks/useRender"
import { useRouter } from "../../utils/hooks/useRouter"
import { useShoppingCartContext } from "../../contexts/shopping-cart"
import { useSelectedProductContext } from "../../contexts/selected-product"

export function ProductModal() {
  const render = useRender()
  const { productModal } = useSelectedProductContext()
  const { selectedProduct: product } = useSelectedProductContext()
  const shoppingCart = useShoppingCartContext()

  return (
    <Modal isOpen={productModal.isOpen} onClose={productModal.onClose}>
      <CloseButton onClick={productModal.onClose} />
      {product && (
        <Form
          onSubmit={() => {
            shoppingCart.add(product)
            productModal.onClose()
          }}
        >
          <Stack spacing="2.25rem">
            <Image
              src={product.image}
              margin="auto"
              height="12.5rem"
              objectFit="contain"
            />
            <Text fontSize="sm" overflowY="auto" maxHeight="6.5rem">
              {product.description}
            </Text>
            <SimpleGrid spacing="1rem" columns={2} fontWeight="semibold">
              <Stack>
                <Text>Refêrencia</Text>
                <Tag>{product.ref}</Tag>
              </Stack>
              <Stack>
                <Text>Valor</Text>
                <Tag>{currency(product.price)}</Tag>
              </Stack>
              <Stack>
                <Text>Quantidade</Text>
                <NumberInput
                  focusInputWhenOpening
                  initialValue={product.amount}
                  onChangeValue={(value) => {
                    product.amount = value
                    render()
                  }}
                />
              </Stack>
              <Stack>
                <Text>Subtotal</Text>
                <Tag>{currency(product.subtotal)}</Tag>
              </Stack>
            </SimpleGrid>
            <SubmitButton>Adicionar ao carrinho</SubmitButton>
          </Stack>
        </Form>
      )}
    </Modal>
  )
}
