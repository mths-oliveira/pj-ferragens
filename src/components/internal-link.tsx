import { Link, LinkProps } from '@chakra-ui/react';
import { useRouter } from '../utils/hooks/useRouter';

interface InternalLinkProps extends LinkProps {
  isShallow?: boolean;
}

export function InternalLink({
  href,
  children,
  isShallow = false,
  ...rest
}: InternalLinkProps) {
  const router = useRouter();

  function handleClick() {
    router.setPath(href, isShallow);
  }

  return (
    <Link onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
