import { ChangeEvent, useEffect, useState } from "react"
import { Stack } from "@chakra-ui/react"
import { SearchInput } from "./input"
import { List } from "../../../list"
import { ListItem } from "../../../list/list-item"
import { DisclosureProps, Modal } from "../../../modal"
import { InternalLink } from "../../../internal-link"
import { useProductsContext } from "../../../../contexts/products"
import { isEmpty } from "../../../../utils/is-empty"
import { useRouter } from "../../../../utils/hooks/useRouter"
import { useSelectedProductContext } from "../../../../contexts/selected-product"

interface Props extends DisclosureProps {}

export function Search({ isOpen, onClose }: Props) {
  const router = useRouter()
  const { setSelectedProduct, productModal } = useSelectedProductContext()
  const products = useProductsContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(onClose, [router.query.ref])
  useEffect(resetSearchTerm, [isOpen])

  function resetSearchTerm() {
    setSearchTerm("")
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.currentTarget.value.toLowerCase()
    setSearchTerm(searchTerm)
  }

  useEffect(() => {
    const productsCompatible = filterProductsBySearchTerm(searchTerm)
    setFilteredProducts(productsCompatible)
  }, [searchTerm])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  function filterProductsBySearchTerm(searchTerm: string) {
    const productsFiltered = products.filter((product) => {
      const productId = `${product.ref} ${product.name}`.toLowerCase()
      return productId.includes(searchTerm)
    })
    return productsFiltered
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Stack
        spacing="1rem"
        maxHeight={["calc(100vh - 3.5rem)", "calc(100vh - 7rem)"]}
      >
        <SearchInput onChange={handleChange} onClick={onClose} />
        <List paddingY="0.75rem">
          {isEmpty(filteredProducts) ? (
            <ListItem>Nenhum resultado para: "{searchTerm}"</ListItem>
          ) : (
            filteredProducts.map((product) => (
              <InternalLink
                as={ListItem}
                isShallow
                key={product.ref}
                onClick={() => {
                  setSelectedProduct(product)
                  productModal.onOpen()
                }}
              >
                {`${product.ref} - ${product.name}`}
              </InternalLink>
            ))
          )}
        </List>
      </Stack>
    </Modal>
  )
}
