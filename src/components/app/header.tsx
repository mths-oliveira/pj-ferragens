import { Image, Center } from '@chakra-ui/react';
import { InternalLink } from '../internal-link';
import { Wrapper } from '../layout/wrapper';

export function Header() {
  return (
    <Wrapper as="header" bg="primary">
      <InternalLink href="/">
        <Center
          marginY="-1rem"
          marginX={['-1.75rem', '-3.5rem', '-3.5rem', '-5.5rem']}
        >
          <Image
            src="/hero.jpg"
            objectFit="cover"
            justifySelf="center"
            title="PJ ferragens"
          />
        </Center>
      </InternalLink>
    </Wrapper>
  );
}
