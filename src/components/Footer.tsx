import { Flex, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import styles from "./Footer.module.scss";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <VStack className={styles.root} as="footer">
      <VStack className={styles.rootContainer}>
        <Flex className={styles.bottomSection}>
          <Flex wrap="wrap" justify="space-evenly" gap="16px">
            <Text>
              <ChakraLink>{t("accessability-statement")}</ChakraLink>
            </Text>
            <Text>
              <ChakraLink>{t("terms-and-conditions")}</ChakraLink>
            </Text>
            <Text>
              <ChakraLink>{t("privacy-policy")}</ChakraLink>
            </Text>
            <Text marginStart="16px">©️ Deeper Cloud 2023</Text>
          </Flex>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default Footer;
