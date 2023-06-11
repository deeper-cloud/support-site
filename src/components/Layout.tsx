import { Container } from "@chakra-ui/react";
import Background from "./Background";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./Layout.module.scss";
import { useTranslation } from "next-i18next";

export function Layout({ children }: any) {
  return (
    <>
      <Background />
      <Navbar />
      <Container
        marginTop="32px"
        marginBottom="64px"
        maxW="container.md"
        as="main"
        className={styles.mainContent}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
}
