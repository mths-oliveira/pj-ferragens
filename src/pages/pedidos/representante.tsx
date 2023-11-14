import { useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { padding } from "../../styles/theme"
import { capitalize } from "../../utils/capitalize"
import { CNPJMask } from "../../utils/cnpj"
import { CPFMask } from "../../utils/cpf"
import { useRouter } from "next/router"
import { useShoppingCartContext } from "../../contexts/shopping-cart"
import { api } from "../../config/api"

interface Customer {
  name: string
  email: string
  id: string
}

interface Order {
  payment: string
  term: string
  discount: string
  observation: string
}
const defaultTerm = "À vista"
const defaultOrder = {
  discount: "",
  observation: "",
  payment: "Dinheiro",
  term: defaultTerm,
}
const defaultCustomer = { email: "", id: "", name: "" }

export default function () {
  const router = useRouter()
  const toast = useToast()
  const { setProducts, products } = useShoppingCartContext()
  const [order, setOrder] = useState<Order>(defaultOrder)
  const [customer, setCustomer] = useState<Customer>(defaultCustomer)
  const [term, setTerm] = useState(defaultTerm)
  useEffect(() => {
    if (term !== defaultTerm) {
      setOrder((order) => {
        return {
          ...order,
          discount: "",
        }
      })
    }
  }, [term])
  return (
    <Box padding={padding}>
      <Flex
        flexDir="column"
        as="form"
        width="22.5rem"
        sx={{
          "&>div": {
            marginTop: "1rem",
          },
        }}
        onSubmit={async (e) => {
          e.preventDefault()
          const userData = localStorage.getItem("user")
          const user = JSON.parse(userData)
          const response = await api.post("/send-sales-representative-email", {
            salesRepresentative: user,
            customer,
            order: {
              ...order,
              products,
            },
          })
          return
          if (response.status === 200) {
            toast({
              status: "success",
              position: "top-right",
              title: "Pedido emitido com sucesso",
              description: "O cliente receberá uma cópia do pedido por e-mail.",
            })
            setProducts([])
            router.push("/")
          } else {
            toast({
              status: "error",
              position: "top-right",
              title: "Erro ao emitir o pedido",
              description:
                "Estamos enfrentando problemas para enviar seu pedido. Por favor, tente novamente mais tarde.",
            })
          }
        }}
      >
        <Heading marginBottom="1.75rem">Emissão de pedido</Heading>
        <Heading fontSize="14px" as="h3">
          Informações do Cliente
        </Heading>
        <FormControl isRequired>
          <FormLabel>Nome</FormLabel>
          <Input
            onChange={(e) => {
              setCustomer({
                ...customer,
                name: e.currentTarget.value,
              })
            }}
            onChangeCapture={(e) => {
              e.currentTarget.value = capitalize(e.currentTarget.value)
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            onChange={(e) => {
              setCustomer({
                ...customer,
                email: e.currentTarget.value,
              })
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>CPF ou CNPJ</FormLabel>
          <Input
            name="id"
            minLength={14}
            maxLength={18}
            onChangeCapture={(e) => {
              const input = e.currentTarget
              const mask = input.value.length > 14 ? CNPJMask : CPFMask
              input.value = mask(input.value)
            }}
            onChange={(e) => {
              setCustomer({
                ...customer,
                id: e.currentTarget.value,
              })
            }}
          />
        </FormControl>
        <Divider marginY="2.25rem" opacity="1" />
        <Heading fontSize="14px" as="h3">
          Informações do Pedido
        </Heading>
        <FormControl>
          <FormLabel>Forma de pagamento</FormLabel>
          <RadioGroup
            defaultValue="Dinheiro"
            name="payment"
            onChange={(payment) => {
              setOrder({
                ...order,
                payment,
              })
            }}
          >
            <Stack>
              <Radio value="Dinheiro">Dinheiro</Radio>
              <Radio value="Cheque">Cheque</Radio>
              <Radio value="Boleto Bancário" isDisabled={false}>
                Boleto Bancário
              </Radio>
              <Radio value="Pagamento por PIX">Pagamento por PIX</Radio>
              <Radio value="Transferência Bancária">
                Transferência Bancária
              </Radio>
              <Radio value="Outros">Outros</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Prazo</FormLabel>
          <Input
            name="term"
            value={term}
            onChange={(e) => {
              const value = e.currentTarget.value
              setOrder({
                ...order,
                term: value,
              })
              setTerm(value)
            }}
            placeholder="Exemplo: 30/60/90"
            onChangeCapture={(event) => {
              const input = event.currentTarget
              input.value = input.value
                .replace(/[^0-9\/]/g, "")
                .replace(/\/{2,}/g, "/")
            }}
            onFocus={() => {
              setTerm("")
            }}
            onBlur={(event) => {
              const input = event.currentTarget
              if (!input.value) {
                setTerm(defaultTerm)
              }
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Desconto</FormLabel>
          <Input
            isDisabled={term === defaultTerm ? null : true}
            name="discount"
            placeholder="Somente à vista"
            onChange={(e) => {
              setOrder({
                ...order,
                discount: e.currentTarget.value,
              })
            }}
            onChangeCapture={(event) => {
              const input = event.currentTarget
              let value = Number(input.value.replace(/\D/g, ""))
              if (value > 100) value = 100
              input.value = String(value)
            }}
            onFocus={(event) => {
              const input = event.currentTarget
              input.defaultValue = input.value.replace(/\D/g, "")
              input.value = ""
            }}
            onBlur={(event) => {
              const input = event.currentTarget
              const value = input.value || input.defaultValue
              input.value = Number(value) > 0 ? `${value}%` : ""
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Observação</FormLabel>
          <Textarea
            onChange={(e) => {
              setOrder({
                ...order,
                observation: e.currentTarget.value,
              })
            }}
            name="observation"
            onKeyPress={(event) => {
              const textArea = event.currentTarget
              if (textArea.value) return
              textArea.value = event.key.toUpperCase()
              event.preventDefault()
            }}
          />
        </FormControl>
        <Button
          marginTop="2.25rem"
          type="submit"
          color="white"
          bg="primary"
          variant="unstyled"
        >
          Emitir pedido
        </Button>
      </Flex>
    </Box>
  )
}
