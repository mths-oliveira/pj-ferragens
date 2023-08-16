import { Center, Image } from "@chakra-ui/react"

export function Hero() {
  return (
    <Center height={["5rem", "15rem"]} bg="primary">
      <Image maxHeight="75%" src="/hero.jpg" title="PJ ferragens" />
    </Center>
  )
}
