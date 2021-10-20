import { Stack } from '@chakra-ui/react';
import { Wrapper } from '../../../components/layout/wrapper';
import { Article } from './article';

export function About() {
  return (
    <Wrapper>
      <Stack spacing={['2.25rem', '2.25rem', '2.25rem', '3.5rem']}>
        <Article title="Quem somos">
          Há mais de dez anos no mercado, nos destacamos por fornecer ferragens
          para portas e janelas, além de acessórios para o lar em kits
          personalizados que facilitam a instalação e execução de serviços.
        </Article>
        <Article title="Missão">
          Comercializar produtos práticos e de qualidade aos nosso clientes que
          proporcionem agilidade em serviços e instalações garantindo a
          satisfação do consumidor final.
        </Article>
        <Article title="Visão">
          Expandir nossa oferta de produtos em variedade e qualidade.
        </Article>
        <Article title="Valores">
          Garantir a satisfação de nosso clientes com atendimento diferenciado
          com preço competitivo.
        </Article>
      </Stack>
    </Wrapper>
  );
}
