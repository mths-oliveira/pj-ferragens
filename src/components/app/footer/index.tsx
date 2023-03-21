import { Stack, Text } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiAtSign, FiMapPin } from 'react-icons/fi';
import { Link } from './link';
import { Icon } from '../../icon';
import { Heading } from '../../heading';
import { Wrapper } from '../../layout/wrapper';

export function Footer() {
  return (
    <Wrapper as="footer" bg="gray.lg">
      <Stack spacing="1.5rem" fontWeight="500" color="gray.dk">
        <Heading>Contato</Heading>
        <Stack fontSize="md" spacing=".75rem">
          <Link href="https://api.whatsapp.com/send?phone=55313453-6384">
            <Icon
              as={FaWhatsapp}
              fontSize="md"
              transform="translateY(0.375rem)"
            />
            <Text>(31) 3453-6384</Text>
          </Link>
          <Link href="mailto:pjferragens@gmail.com">
            <Icon
              as={FiAtSign}
              fontSize="md"
              transform="translateY(0.375rem)"
            />
            <Text>pjferragens@gmail.com</Text>
          </Link>
          <Link href="https://www.google.com/maps/place/R.+Rosa+Zandona,+128+-+Venda+Nova,+Belo+Horizonte+-+MG,+31510-050/@-19.8165118,-43.9612814,17z/data=!4m13!1m7!3m6!1s0xa68fe9b214955f:0xc5f783f0dc1c1e9d!2sR.+Rosa+Zandona,+128+-+Venda+Nova,+Belo+Horizonte+-+MG,+31510-050!3b1!8m2!3d-19.8164447!4d-43.9613243!3m4!1s0xa68fe9b214955f:0xc5f783f0dc1c1e9d!8m2!3d-19.8164447!4d-43.9613243">
            <Icon
              as={FiMapPin}
              fontSize="md"
              transform="translateY(0.375rem)"
            />
            <Text>
              R. Rosa Zandona, 128 - Venda Nova, Belo Horizonte - MG, 31510-050
            </Text>
          </Link>
        </Stack>
        <Text paddingTop="0.25rem">
          Copyright © 2021 | PJ ferragens | Todos os direitos reservados.
        </Text>
      </Stack>
    </Wrapper>
  );
}
