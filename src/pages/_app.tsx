import { ChakraProvider, Flex } from "@chakra-ui/react"
import Head from "next/head"
import { theme } from "../styles/theme"
import { AppProps } from "next/app"
import { Hero } from "../components/app/hero"
import { Footer } from "../components/app/footer"
import { Navbar } from "../components/app/navbar"
import { ProductModal } from "../components/app/product-modal"
import { SelectedProductContextProvider } from "../contexts/selected-product"
import { ShoppingCartContextProvider } from "../contexts/shopping-cart"

export default function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Loja de Ferragens | PJ Ferragens</title>
        <meta name="title" content="Loja de Ferragens | PJ Ferragens" />
        <meta
          name="description"
          content="Na PJ ferragens você encontra itens como: Fechadura, Maçaneta, Trinco, Dobradiça, Parafuso, Puxadores e todas as demais ferragens para sua casa."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <Flex flexDirection="column">
          <ShoppingCartContextProvider>
            <SelectedProductContextProvider>
              <Navbar />
              <Hero />
              <ProductModal />
              <Component {...pageProps} />
            </SelectedProductContextProvider>
          </ShoppingCartContextProvider>
          <Footer />
        </Flex>
      </ChakraProvider>
    </>
  )
}
