import { Flex, Grid, Icon, Image, Stack, Text } from "@chakra-ui/react"
import { GetStaticPaths, GetStaticProps } from "next"
import { MdOutlineInfo } from "react-icons/md"
import { ProductRepository } from "../../backend/repositories/products"
import { useSelectedProductContext } from "../../contexts/selected-product"

interface Props {
  products: Product[]
}

interface Product {
  ref: string
  name: string
  description: string
  image: string
  price: number
}

export default function ({ products }: Props) {
  const { selectedProduct, setSelectedProduct } = useSelectedProductContext()
  return (
    <Grid
      display={["flex", "grid"]}
      gap="1.5rem"
      paddingY={["2.25rem", "5rem"]}
      paddingX="2.25rem"
      flexDirection="column"
      marginX={["auto", "initial"]}
      justifyContent={["initial", "initial", "center"]}
      gridTemplateColumns="repeat(auto-fill, 15rem)"
    >
      {products.map((product) => (
        <Stack
          onClick={() => {
            setSelectedProduct({
              amount: 1,
              description: product.description,
              image: product.image,
              price: product.price,
              ref: product.ref,
              subtotal: product.price,
            })
          }}
          key={product.ref}
          width="15rem"
          padding="1.5rem"
          spacing="1.25rem"
          shadow="md"
          borderRadius="md"
          cursor="pointer"
          flexShrink={0}
          transition="all .1s ease"
          _hover={{
            shadow: "xl",
            "&> img": {
              transform: "scale(1.125)",
            },
            "&> span": {
              color: "primary",
              textDecoration: "underline",
            },
          }}
        >
          <Image
            title={product.name}
            src={product.image}
            height="8.5rem"
            marginX="auto"
            objectFit="contain"
            transition="all .1s ease"
          />
          <Text
            cursor="text"
            overflowY="auto"
            height="5rem"
            paddingTop="0.5rem"
          >
            {product.description}
          </Text>
          <Flex as="span" alignItems="flex-start">
            <Text fontWeight="500" fontSize="1rem">
              Mais informações
            </Text>
            <Icon
              as={MdOutlineInfo}
              transform="translateY(0.25rem)"
              marginLeft="0.5rem"
            />
          </Flex>
        </Stack>
      ))}
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const category = ctx.params.category as string
  const productRepository = new ProductRepository()
  const products = await productRepository.find(category)
  return {
    props: {
      products,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [
    "fechaduras_e_acessorios",
    "ferragens_em_geral",
    "ferragens_para_janelas",
    "ferragens_para_portas",
    "pecas_para_moveis",
    "utilidades_domesticas",
  ]
  const paths = categories.map((category) => {
    return {
      params: {
        category,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}
