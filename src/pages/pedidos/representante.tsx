import {
  Box,
  Button,
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
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { api } from "../../config/api"
import { useShoppingCartContext } from "../../contexts/shopping-cart"
import { padding } from "../../styles/theme"
import { capitalize } from "../../utils/capitalize"
import { CNPJMask } from "../../utils/cnpj"
import { CPFMask } from "../../utils/cpf"

interface CustomerDataProps {
  setCustomer: (fn: (customer: Customer) => Customer) => void
}

interface Customer {
  name: string
  email: string
  id: string
}

function CustomerData({ setCustomer }: CustomerDataProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget
    setCustomer((customer) => {
      return {
        ...customer,
        [input.name]: input.name,
      }
    })
  }
  return (
    <Stack spacing="1.5rem">
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          onChange={handleChange}
          name="name"
          onChangeCapture={(e) => {
            e.currentTarget.value = capitalize(e.currentTarget.value)
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input onChange={handleChange} name="email" type="email" />
      </FormControl>
      <FormControl>
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
          onChange={handleChange}
        />
      </FormControl>
    </Stack>
  )
}

interface OrderDataProps {
  setOrder: (fn: (order: Order) => Order) => void
}

interface Order {
  payment: string
  term: string
  discount: string
  observation: string
}

function OrderData({ setOrder }: OrderDataProps) {
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const input = e.target
    setOrder((order) => {
      return {
        ...order,
        [input.name]: input.name,
      }
    })
  }
  return (
    <Stack spacing="1.5rem">
      <FormControl>
        <FormLabel>Forma de pagamento</FormLabel>
        <RadioGroup defaultValue="Dinheiro" name="payment">
          <Stack onChange={handleChange as any}>
            <Radio value="Dinheiro">Dinheiro</Radio>
            <Radio value="Cheque">Cheque</Radio>
            <Radio value="Boleto Bancário" isDisabled={false}>
              Boleto Bancário
            </Radio>
            <Radio value="Pagamento por PIX">Pagamento por PIX</Radio>
            <Radio value="Transferência Bancária">Transferência Bancária</Radio>
            <Radio value="Outros">Outros</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Prazo</FormLabel>
        <Input
          name="term"
          onChange={handleChange}
          defaultValue="À vista"
          placeholder="Exemplo: 30/60/90"
          onChangeCapture={(event) => {
            const input = event.currentTarget
            input.value = input.value
              .replace(/[^0-9\/]/g, "")
              .replace(/\/{2,}/g, "/")
          }}
          onFocus={(event) => {
            const input = event.currentTarget
            input.value = ""
          }}
          onBlur={(event) => {
            const input = event.currentTarget
            if (!input.value) {
              input.value = input.defaultValue
            }
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Desconto</FormLabel>
        <Input
          name="discount"
          placeholder="Somente à vista"
          onChange={handleChange}
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
          onChange={handleChange}
          name="observation"
          onKeyPress={(event) => {
            const textArea = event.currentTarget
            if (textArea.value) return
            textArea.value = event.key.toUpperCase()
            event.preventDefault()
          }}
        />
      </FormControl>
    </Stack>
  )
}

export default function () {
  const router = useRouter()
  const toast = useToast()
  const { setProducts } = useShoppingCartContext()
  const [customer, setCustomer] = useState({})
  const [order, setOrder] = useState({})
  return (
    <Box padding={padding}>
      <Stack
        spacing="2.25rem"
        width="22.5rem"
        as="form"
        onSubmit={async (e) => {
          e.preventDefault()
          const userData = localStorage.getItem("user")
          const user = JSON.parse(userData)
          const response = await api.post("/send-sales-representative-email", {
            salesRepresentative: user,
            customer,
            order,
          })
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
        <Heading>Emissão de pedido</Heading>
        <Heading fontSize="14px" as="h3" marginBottom="1rem">
          Informações do Cliente
        </Heading>
        <CustomerData setCustomer={setCustomer} />
        <Heading fontSize="14px" as="h3" marginBottom="1rem">
          Informações do Pedido
        </Heading>
        <OrderData setOrder={setOrder} />
        <Button type="submit" color="white" bg="primary" variant="unstyled">
          Emitir pedido
        </Button>
      </Stack>
    </Box>
  )
}
