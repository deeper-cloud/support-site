import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, ThemeProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Layout } from "../components/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
