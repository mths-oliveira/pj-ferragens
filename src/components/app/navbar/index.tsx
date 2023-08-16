import { Flex } from "@chakra-ui/react"
import { Authentication } from "./authentication/index"
import { Menu } from "./menu"
import { SearchBox } from "./search-box"
import { ShoppingCart } from "./shopping-cart"

export function Navbar() {
  return (
    <Flex
      position="sticky"
      top="0"
      zIndex="10"
      justifyContent="space-between"
      alignItems="center"
      paddingX="0.5rem"
      bg="#fff"
      boxShadow="md"
      sx={{
        ">div>button": {
          height: "3.5rem",
          bg: "transparent",
          _hover: {
            bg: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          ">svg": {
            fontSize: "1.5rem",
          },
        },
      }}
    >
      <Flex>
        <Menu />
        <SearchBox />
      </Flex>
      <Flex>
        <Authentication />
        <ShoppingCart />
      </Flex>
    </Flex>
  )
}
