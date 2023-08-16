import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { api } from "../../config/api"
import { useShoppingCartContext } from "../../contexts/shopping-cart"
import { padding } from "../../styles/theme"
import { capitalize } from "../../utils/capitalize"

export default function () {
  const { products } = useShoppingCartContext()
  const toast = useToast()
  const router = useRouter()
  return (
    <Box padding={padding}>
      <Flex flexDirection="column" maxWidth="22.5rem">
        <Stack spacing="1rem">
          <Heading>Orçamento</Heading>
          <Text>
            Você receberá o seu orçamento por e-mail, para isso, preencha os
            campos a seguir
          </Text>
        </Stack>
        <Flex
          flexDirection="column"
          marginTop="1.5rem"
          as="form"
          onSubmit={async (e) => {
            e.preventDefault()
            const inputs = Array.from(
              e.currentTarget.getElementsByTagName("input")
            )
            const customer = {}
            for (const input of inputs) {
              customer[input.name] = input.value
            }
            const response = await api.post("/send-customer-email", {
              customer,
              products,
            })
            response.status === 200
              ? toast({
                  status: "success",
                  position: "top-right",
                  title: "Solicitação feita com sucesso",
                  description:
                    "Você receberá o seu orçamento por e-mail, por favor, verifique sua caixa de spam e outros filtros.",
                })
              : toast({
                  status: "error",
                  title: "Erro ao solicitar orçamento",
                  position: "top-right",
                  description:
                    "Estamos enfrentando problemas para enviar seu pedido de orçamento, tente novamente mais tarde.",
                })
          }}
        >
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={(e) => {
                e.target.value = capitalize(e.target.value)
              }}
            />
          </FormControl>
          <FormControl marginTop="1.5rem">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <Flex marginY="1.5rem" justifyContent="center">
            <Text marginRight="0.25rem">Quer adicionar mais produtos?</Text>
            <Link
              color="primary"
              marginLeft="0.25rem"
              onClick={() => {
                router.back()
              }}
            >
              Voltar à loja
            </Link>
          </Flex>
          <Button type="submit" bg="primary" color="#fff" variant="unstyled">
            Solicitar orçamento
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
