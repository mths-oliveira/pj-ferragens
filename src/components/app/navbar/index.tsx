import { Flex, useDisclosure } from '@chakra-ui/react';
import { MdMenu, MdPerson, MdSearch, MdShoppingCart } from 'react-icons/md';
import { ButtonWithIcon } from '../../button-with-icon';
import { Authentication } from './authentication';
import { Menu } from './menu';
import { ProductCounter } from './product-counter';
import { Search } from './search';
import { ShoppingCart } from './shopping-cart';

export function Navbar() {
  const drawerMenu = useDisclosure();
  const modalSearch = useDisclosure();
  const modalAuthentication = useDisclosure();
  const drawerShoppingCart = useDisclosure();
  return (
    <>
      <Flex
        as="nav"
        width="100%"
        height="3.5rem"
        paddingX="0.5rem"
        bg="white"
        boxShadow="lg"
        justifyContent="space-between"
        position="sticky"
        top="0"
        zIndex="100"
      >
        <Flex>
          <ButtonWithIcon icon={MdMenu} onClick={drawerMenu.onOpen} />
          <ButtonWithIcon icon={MdSearch} onClick={modalSearch.onOpen} />
        </Flex>
        <Flex>
          <ButtonWithIcon
            icon={MdPerson}
            onClick={modalAuthentication.onOpen}
          />
          <ButtonWithIcon
            icon={MdShoppingCart}
            onClick={drawerShoppingCart.onOpen}
          >
            <ProductCounter />
          </ButtonWithIcon>
        </Flex>
      </Flex>
      <Menu isOpen={drawerMenu.isOpen} onClose={drawerMenu.onClose} />
      <Search isOpen={modalSearch.isOpen} onClose={modalSearch.onClose} />
      <Authentication
        isOpen={modalAuthentication.isOpen}
        onClose={modalAuthentication.onClose}
      />
      <ShoppingCart
        isOpen={drawerShoppingCart.isOpen}
        onOpen={drawerShoppingCart.onOpen}
        onClose={drawerShoppingCart.onClose}
      />
    </>
  );
}
