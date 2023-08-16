import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import Link from "next/link"
import categories from "../../../../categories.json"
import { MdMenu } from "react-icons/md"
export function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={MdMenu} />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxWidth="15rem">
          <DrawerHeader padding="1rem">
            <Link href="/" onClick={onClose}>
              <Image src="/hero.jpg" />
            </Link>
          </DrawerHeader>
          <DrawerBody padding="0">
            <Link href="/" onClick={onClose}>
              <Text
                padding="0.75rem 1.5rem"
                _hover={{
                  bg: "secondary",
                }}
              >
                Home
              </Text>
            </Link>
            <Divider />
            {categories.map(({ href, title }) => (
              <Link key={title} href={href} onClick={onClose}>
                <Text
                  padding="0.75rem 1.5rem"
                  _hover={{
                    bg: "secondary",
                  }}
                >
                  {title}
                </Text>
              </Link>
            ))}
            <Divider />
            <Link href="/sobre" onClick={onClose}>
              <Text
                padding="0.75rem 1.5rem"
                _hover={{
                  bg: "secondary",
                }}
              >
                Sobre nós
              </Text>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
