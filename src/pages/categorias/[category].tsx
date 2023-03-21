import { GetStaticPaths, GetStaticProps } from "next"
import { Grid } from "@chakra-ui/react"
import { Wrapper } from "../../components/layout/wrapper"
import { InternalLink } from "../../components/internal-link"
import { Card } from "../../components/card"
import { useRouter } from "../../utils/hooks/useRouter"
import { ProductsRepository } from "../../backend/repositories/products"

interface Product {
  ref: string
  name: string
  image: string
  description: string
}

export interface CategoryProps {
  products: Product[]
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter()

  return (
    <Wrapper overflowX={["auto", "auto", "hidden"]} bg="white" color="gray.md">
      <Grid
        display={["flex", "flex", "grid"]}
        gap="1.5rem"
        paddingY="1rem"
        justifyContent={["initial", "initial", "center"]}
        gridTemplateColumns="repeat(auto-fill, 15rem)"
      >
        {products.map((product) => (
          <InternalLink
            isShallow
            key={product.ref}
            href={`${router.absolutePath}?ref=${product.ref}`}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Card src={product.image} title={product.name}>
              {product.description}
            </Card>
          </InternalLink>
        ))}
      </Grid>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (ctx) => {
  const productsRepository = new ProductsRepository()
  const category = ctx.params.category as string
  const products = await productsRepository.getProductsByCategory(category)

  return {
    props: {
      products: products.map<Product>((product) => {
        return {
          description: product.description,
          image: product.image,
          name: product.name,
          ref: product.ref,
        }
      }),
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
