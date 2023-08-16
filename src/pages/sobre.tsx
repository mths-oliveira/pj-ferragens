import { Heading, Stack, Text } from "@chakra-ui/react"
import { padding } from "../styles/theme"

const data = [
  {
    title: "Quem somos",
    text: "Há mais de dez anos no mercado, nos destacamos por fornecer ferragens para portas e janelas, além de acessórios para o lar em kits personalizados que facilitam a instalação e execução de serviços.",
  },
  {
    title: "Missão",
    text: "Comercializar produtos práticos e de qualidade aos nosso clientes que proporcionem agilidade em serviços e instalações garantindo a satisfação do consumidor final.",
  },
  {
    title: "Visão",
    text: "Expandir nossa oferta de produtos em variedade e qualidade.",
  },
  {
    title: "Valores",
    text: "Garantir a satisfação de nosso clientes com atendimento diferenciado com preço competitivo.",
  },
]

export default function () {
  return (
    <Stack padding={padding} spacing="2.25rem">
      {data.map(({ text, title }) => (
        <Stack key={title}>
          <Heading>{title}</Heading>
          <Text>{text}</Text>
        </Stack>
      ))}
    </Stack>
  )
}
