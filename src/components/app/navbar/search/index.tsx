import { ChangeEvent, useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { SearchInput } from './input';
import { List } from '../../../list';
import { ListItem } from '../../../list/list-item';
import { DisclosureProps, Modal } from '../../../modal';
import { InternalLink } from '../../../internal-link';
import { useProductsContext } from '../../../../contexts/products';
import { isEmpty } from '../../../../utils/is-empty';
import { useRouter } from '../../../../utils/hooks/useRouter';

interface Props extends DisclosureProps {}

export function Search({ isOpen, onClose }: Props) {
  const router = useRouter();
  const products = useProductsContext();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(onClose, [router.query.ref]);
  useEffect(resetSearchTerm, [isOpen]);

  function resetSearchTerm() {
    setSearchTerm('');
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.currentTarget.value.toLowerCase();
    setSearchTerm(searchTerm);
  }

  useEffect(() => {
    const productsCompatible = filterProductsBySearchTerm(searchTerm);
    if (productsCompatible.length > 25) {
      productsCompatible.length = 25;
    }
    setFilteredProducts(productsCompatible);
  }, [searchTerm]);

  function filterProductsBySearchTerm(searchTerm: string) {
    const productsFiltered = products.filter((product) => {
      const productId = `${product.ref} ${product.name}`.toLowerCase();
      return productId.includes(searchTerm);
    });
    return productsFiltered;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Stack
        spacing="1rem"
        maxHeight={['calc(100vh - 3.5rem)', 'calc(100vh - 7rem)']}
      >
        <SearchInput onChange={handleChange} onClick={onClose} />
        <List paddingY="0.75rem">
          {isEmpty(filteredProducts) ? (
            <ListItem>Nenhum resultado para: "{searchTerm}"</ListItem>
          ) : (
            filteredProducts.map((product) => (
              <InternalLink
                as={ListItem}
                isShallow
                key={product.ref}
                href={`${router.absolutePath}?ref=${product.ref}`}
              >
                {`${product.ref} - ${product.name}`}
              </InternalLink>
            ))
          )}
        </List>
      </Stack>
    </Modal>
  );
}
