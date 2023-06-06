import { Container } from "@chakra-ui/react";
import Background from "./Background";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./Layout.module.scss";

export function Layout({ children }: any) {
  return (
    <>
      <Background />
      <Navbar />
      <Container as="main" className={styles.mainContent}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
