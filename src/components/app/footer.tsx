import { Flex, Heading, Stack, Text, Icon, Link, Box } from "@chakra-ui/react"
import { FaWhatsapp } from "react-icons/fa"
import { FiAtSign, FiMapPin } from "react-icons/fi"
import { padding } from "../../styles/theme"

export function Footer() {
  return (
    <Flex as="footer" bg="secondary" padding={padding}>
      <Stack spacing="1.75rem" fontWeight="500" marginY={{ lg: "-1rem" }}>
        <Heading>Contato</Heading>
        <Box
          sx={{
            ">a": {
              display: "flex",
              fontSize: "1rem",
              _hover: {
                color: "primary",
              },
              "&:not(:first-of-type)": {
                marginTop: "1rem",
              },
              ">svg": {
                fontSize: "1.25rem",
                marginRight: "1rem",
                marginTop: "-0.125rem",
              },
            },
          }}
        >
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
        </Box>
        <Text fontSize="14px" paddingTop="0.25rem">
          Copyright © 2023 | PJ ferragens | Todos os direitos reservados.
        </Text>
      </Stack>
    </Flex>
  )
}
