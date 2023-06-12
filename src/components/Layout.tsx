import {
  Box,
  Button,
  Container,
  HStack,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import Background from "./Background";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./Layout.module.scss";
import { Aside } from "./Aside";
import { useTranslation } from "next-i18next";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export function Layout({ children, ...props }: any) {
  const { t } = useTranslation("common");
  const isMobile = useMediaQuery("(max-width: 1024px)")[0];
  const router = useRouter();
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
        <VStack align="start">
          {router.route !== "/" && (
            <Button
              size="md"
              variant="link"
              color="accent.500"
              bg="transparent"
              leftIcon={<ArrowBackIcon />}
              onClick={router.back}
            >
              {t("back")}
            </Button>
          )}
          <HStack gap="16px" align="start">
            <Box flex="3">{children}</Box>
            {!isMobile && props?.popularPages?.length > 0 && (
              <Box flex="1" paddingTop="64px">
                <Aside popularPages={props?.popularPages} />
              </Box>
            )}
          </HStack>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
