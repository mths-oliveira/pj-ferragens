import { useEffect } from 'react';
import { Divider } from '../../divider';
import { Drawer, DisclosureProps } from '../../drawer';
import { useRouter } from '../../../utils/hooks/useRouter';
import { InternalLink } from '../../internal-link';
import { ListItem } from '../../list/list-item';
import categories from '../../../../categories.json';

interface Props extends DisclosureProps {}

export function Menu({ isOpen, onClose }: Props) {
  const router = useRouter();

  useEffect(onClose, [router.query.category]);

  return (
    <Drawer
      as="ul"
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      padding="0.75rem 0"
    >
      <InternalLink as={ListItem} href="/">
        Início
      </InternalLink>
      <Divider />
      {categories.map((category) => (
        <InternalLink as={ListItem} key={category.href} href={category.href}>
          {category.title}
        </InternalLink>
      ))}
      <Divider />
      <InternalLink as={ListItem} href="/sobre">
        Sobre nós
      </InternalLink>
    </Drawer>
  );
}
