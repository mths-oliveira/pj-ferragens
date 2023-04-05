import { GetStaticPaths, GetStaticProps } from "next"
import { Grid } from "@chakra-ui/react"
import { Wrapper } from "../../components/layout/wrapper"
import { Card } from "../../components/card"
import { useSelectedProductContext } from "../../contexts/selected-product"
import { ProductsRepository } from "../../backend/repositories/products"
import { useRouter } from "next/router"
import { Product } from "../../backend/entities/product"

interface IProduct {
  ref: string
  name: string
  description: string
  image: string
  category: string
  price: number
}

export interface CategoryProps {
  products: IProduct[]
  category: string
}
const productsRepository = new ProductsRepository()

export default function Category({ products, category }: CategoryProps) {
  const { setSelectedProduct, productModal } = useSelectedProductContext()
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
          <Card
            key={product.ref}
            src={product.image}
            title={product.name}
            onClick={async () => {
              const selectedProduct = new Product(
                product.ref,
                product.name,
                product.description,
                product.image,
                product.category,
                product.price
              )
              setSelectedProduct(selectedProduct)
              productModal.onOpen()
            }}
          >
            {product.description}
          </Card>
        ))}
      </Grid>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (ctx) => {
  const category = ctx.params.category as string
  const products = await productsRepository.getProductsByCategory(category)

  return {
    props: {
      category,
      products: products.map<IProduct>((product) => {
        return {
          description: product.description,
          image: product.image,
          name: product.name,
          ref: product.ref,

          category: product.category,
          price: product.price,
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
