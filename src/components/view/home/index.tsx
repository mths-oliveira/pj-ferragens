import { Grid } from "@chakra-ui/react"
import { Wrapper } from "../../../components/layout/wrapper"
import { Heading } from "../../../components/heading"
import { LinkWithImage } from "./link-with-image"
import categories from "../../../../categories.json"

export function Home() {
  return (
    <Wrapper color="gray.md" bg="white">
      <Heading textAlign={{ lg: "center" }} as="h1">
        Ferragens, confira as categorias em destaque
      </Heading>
      <Grid
        gap=".5rem"
        marginTop="2.25rem"
        marginX={["-1rem", "0"]}
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
        ]}
      >
        {categories.map((category) => (
          <LinkWithImage
            key={category.href}
            src={category.image}
            href={category.href}
            label={category.title}
          />
        ))}
      </Grid>
    </Wrapper>
  )
}
