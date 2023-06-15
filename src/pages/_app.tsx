import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, GlobalStyle, ThemeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Layout } from "../components/Layout";
import NextI18nextConfig from "../../next-i18next.config";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(App, NextI18nextConfig as any);
