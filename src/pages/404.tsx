import { Center, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export async function getStaticProps({ locale = "en-US", params }: any) {


  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function NotFoundPage() {
  const { t } = useTranslation("common");
  return (
    <Center>
      <Heading>404</Heading>
      <Text>{t("PageNotFound")}</Text>
    </Center>
  );
}
