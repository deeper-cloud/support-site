import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, GlobalStyle, ThemeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Layout } from "../components/Layout";
import { I18nContext, appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
