import { Box, Image, SimpleGrid, Text, useColorMode } from "@chakra-ui/react"
import { useEffect } from "react"
import Link from "next/link"
import categories from "../../categories.json"
import { padding } from "../styles/theme"

export default function () {
  const { setColorMode } = useColorMode()
  useEffect(() => {
    setColorMode("light")
  }, [])
  return (
    <SimpleGrid padding={padding} columns={[1, 2, 2, 2, 3]} gap="1rem">
      {categories.map(({ href, src, title }) => (
        <Box
          key={title}
          as={Link}
          href={href}
          position="relative"
          _hover={{
            ">p": {
              textDecoration: "underline",
            },
          }}
        >
          <Image src={src} />
          <Text
            position="absolute"
            bottom="0"
            width="100%"
            padding="1.25rem"
            bg="linear-gradient(transparent, rgba(0,0,0,0.75))"
            color="#fff"
            fontWeight="bold"
            fontSize="1.25rem"
          >
            {title}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
