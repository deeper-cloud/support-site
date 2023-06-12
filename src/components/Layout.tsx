import { Box, Container, HStack } from "@chakra-ui/react";
import Background from "./Background";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./Layout.module.scss";
import { Aside } from "./Aside";

export function Layout({ children }: any) {
  return (
    <>
      <Background />
      <Navbar />
      <Container
        marginTop="32px"
        marginBottom="64px"
        maxW="container.lg"
        as="main"
        className={styles.mainContent}
      >
        <HStack gap="16px" align="start">
          <Box flex="3">{children}</Box>
          {/* <Box flex="1" paddingTop="64px">
            <Aside />
          </Box> */}
        </HStack>
      </Container>
      <Footer />
    </>
  );
}
