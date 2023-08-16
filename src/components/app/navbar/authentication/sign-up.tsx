import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react"
import { Props } from "."
import { capitalize } from "../../../../utils/capitalize"
import { PasswordInput } from "../../../password-input"

export function SignUp({ onSubmit, setSreen }: Props) {
  return (
    <>
      <Heading marginBottom="1.5rem">Registre-se</Heading>
      <Flex
        flexDirection="column"
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          const inputs = Array.from(
            e.currentTarget.getElementsByTagName("input")
          )
          const data = {}
          for (const input of inputs) {
            data[input.name] = input.value
          }
          onSubmit(data)
        }}
      >
        <Stack spacing="1.5rem">
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input
              name="name"
              placeholder="Digite seu nome completo"
              onChange={(e) => {
                e.target.value = capitalize(e.target.value)
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Digite seu melhor e-mail"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <PasswordInput name="password" placeholder="Mínimo 8 caracteres" />
          </FormControl>
          <FormControl>
            <FormLabel>Código de segurança</FormLabel>
            <PasswordInput
              name="code"
              placeholder="(Somente pessoal autorizado)"
            />
          </FormControl>
        </Stack>
        <Flex marginY="1.5rem" justifyContent="center">
          <Text>Já tem uma conta?</Text>
          <Link
            color="primary"
            marginLeft="0.25rem"
            onClick={(e) => {
              e.preventDefault()
              setSreen("sign-in")
            }}
          >
            Entrar
          </Link>
        </Flex>
        <Button type="submit" bg="primary" color="#fff" _hover={{}}>
          Cadastrar-se
        </Button>
      </Flex>
    </>
  )
}
