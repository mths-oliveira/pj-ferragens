import { Box, Image, Text } from '@chakra-ui/react';
import { InternalLink } from '../../../components/internal-link';

interface LinkWithImageProps {
  src: string;
  href: string;
  label: string;
}

export function LinkWithImage({ href, label, src }: LinkWithImageProps) {
  return (
    <InternalLink href={href}>
      <Box
        position="relative"
        borderRadius="sm"
        overflow="hidden"
        _hover={{
          '& > div > p': {
            textDecoration: 'underline',
          },
        }}
      >
        <Image src={src} title={label} width="100%" objectFit="cover" />
        <Box
          width="100%"
          bgImage="linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
          padding="1.25rem"
          position="absolute"
          bottom="0"
          left="0"
        >
          <Text fontSize="md" fontWeight="bold" color="white">
            {label}
          </Text>
        </Box>
      </Box>
    </InternalLink>
  );
}
