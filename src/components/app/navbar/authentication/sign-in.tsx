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
import { PasswordInput } from "../../../password-input"

export function SignIn({ onSubmit, setSreen }: Props) {
  return (
    <>
      <Heading marginBottom="1.5rem">Entrar</Heading>
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
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <PasswordInput name="password" />
          </FormControl>
        </Stack>
        <Flex marginY="1.5rem" justifyContent="center">
          <Text>Não tem uma conta?</Text>
          <Link
            color="primary"
            marginLeft="0.25rem"
            onClick={(e) => {
              e.preventDefault()
              setSreen("sign-up")
            }}
          >
            Registre-se
          </Link>
        </Flex>
        <Button type="submit" bg="primary" color="#fff" _hover={{}}>
          Entrar
        </Button>
      </Flex>
    </>
  )
}
