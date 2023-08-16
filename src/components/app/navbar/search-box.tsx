import {
  Button,
  Icon,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { MdSearch } from "react-icons/md"
import { Stack, Input, InputProps } from "@chakra-ui/react"
import { api } from "../../../config/api"
import { useEffect, useState } from "react"
import { removeAccent } from "../../../utils/remove-accent"
import { useSelectedProductContext } from "../../../contexts/selected-product"

export function SearchBox() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setSelectedProduct } = useSelectedProductContext()
  const [products, setProducts] = useState([])
  const [inputValue, setInputValue] = useState("")
  const filteredProducts = products.filter(({ ref, name }) => {
    const value = removeAccent(name).toLowerCase()
    return `${ref} ${value}`.includes(inputValue.toLowerCase())
  })

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data)
    })
  }, [])
  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={MdSearch} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent
          bg="transparent"
          borderRadius="5px"
          overflow="hidden"
          marginTop={["0", "4rem"]}
          maxHeight={["100%", "calc(100% - 7.5rem)"]}
        >
          <Stack
            bg="white"
            direction="row"
            spacing="1rem"
            padding="0.5rem 1.5rem"
            alignItems="center"
            borderRadius="5px"
          >
            <Input
              size="lg"
              fontSize="1rem"
              padding="0"
              border="none"
              _focus={{
                boxShadow: "none",
              }}
              onChange={(e) => {
                setInputValue(e.currentTarget.value)
              }}
            />
            <Button variant="unstyled" onClick={onClose}>
              <Icon as={MdSearch} fontSize="1.5rem" marginTop="0.5rem" />
            </Button>
          </Stack>
          <ModalBody
            bg="#fff"
            padding="0"
            marginTop="1.5rem"
            borderRadius="5px"
          >
            {filteredProducts.length ? (
              <List padding="0.75rem 0">
                {filteredProducts.map((product) => (
                  <ListItem
                    key={product.ref}
                    padding="0.75rem 1.5rem"
                    cursor="pointer"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    _hover={{ bg: "secondary" }}
                    onClick={() => {
                      onClose()
                      setSelectedProduct({
                        amount: 1,
                        description: product.description,
                        image: product.image,
                        price: product.price,
                        ref: product.ref,
                        subtotal: product.price,
                      })
                    }}
                  >{`${product.ref} - ${product.name}`}</ListItem>
                ))}
              </List>
            ) : (
              <Text padding="1.5rem">
                Nenhum resultado encontrado para "{inputValue}"
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
