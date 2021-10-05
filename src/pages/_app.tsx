import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { Header } from '../components/app/header';
import { Footer } from '../components/app/footer';

export default function MyApp({ Component, pageProps }: AppProps) {
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          crossOrigin="true"
          href="https://fonts.gstatic.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap"
        />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  );
}
