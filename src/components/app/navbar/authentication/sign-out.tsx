import { Avatar, Button, Stack, Text } from "@chakra-ui/react"
import { Screen } from "."

interface SignOutProps {
  onSubmit: () => void
  user: {
    name: string
    email: string
  }
}

export function SignOut({ onSubmit, user }: SignOutProps) {
  return (
    <Stack
      spacing="2.25rem"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <Stack alignItems="center">
        <Avatar
          name={user.name}
          bg="white"
          size="xl"
          color="gray.md"
          boxShadow="lg"
        />
        <Text
          fontSize="1.25rem"
          fontWeight="bold"
          transform="translateY(0.5rem)"
        >
          {user.name}
        </Text>
        <Text fontWeight="500" color="blue.600" textDecoration="underline">
          {user.email}
        </Text>
      </Stack>
      <Button type="submit" bg="primary" color="#fff" _hover={{}}>
        Sair
      </Button>
    </Stack>
  )
}
