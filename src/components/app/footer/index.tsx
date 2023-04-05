import { Stack, Text } from "@chakra-ui/react"
import { FaWhatsapp } from "react-icons/fa"
import { FiAtSign, FiMapPin } from "react-icons/fi"
import { Link } from "./link"
import { Icon } from "../../icon"
import { Heading } from "../../heading"
import { Wrapper } from "../../layout/wrapper"

export function Footer() {
  return (
    <Wrapper as="footer" bg="gray.lg">
      <Stack spacing="1.5rem" fontWeight="500" color="gray.dk">
        <Heading>Contato</Heading>
        <Stack fontSize="sm" spacing=".75rem">
          <Link href="https://api.whatsapp.com/send?phone=55313453-6384">
            <Icon
              as={FaWhatsapp}
              fontSize="sm"
              transform="translateY(0.25rem)"
            />
            <Text>(31) 3453-6384</Text>
          </Link>
          <Link href="mailto:pjferragens@gmail.com">
            <Icon as={FiAtSign} fontSize="sm" transform="translateY(0.25rem)" />
            <Text>pjferragens@gmail.com</Text>
          </Link>
          <Link href="https://www.google.com/maps/place/R.+do+Cercado,+128+-+Venda+Nova,+Belo+Horizonte+-+MG/data=!4m2!3m1!1s0xa68fe9a9b4ad33:0x97811d527fe3a879?sa=X&ved=2ahUKEwimysmDlPD9AhWJO7kGHe4uCW0Q8gF6BAgNEAI">
            <Icon as={FiMapPin} fontSize="sm" transform="translateY(0.25rem)" />
            <Text>
              Rua do Cercado, 128, Venda Nova, Belo Horizonte, MG, CEP 31510-405
            </Text>
          </Link>
        </Stack>
        <Text paddingTop="0.25rem">
          Copyright © 2023 | PJ ferragens | Todos os direitos reservados.
        </Text>
      </Stack>
    </Wrapper>
  )
}
