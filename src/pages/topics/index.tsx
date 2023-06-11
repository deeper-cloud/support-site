import { Heading, VStack, Text } from "@chakra-ui/react";
import { ItemList } from "../../components/ItemList";
import { useTranslation } from "next-i18next";
import topics from "../../generated/topics.json";
import { Header } from "../../components/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      items: topics,
    },
  };
}

export default function Questions({ items }: any) {
  const { t } = useTranslation("common");
  return (
    <VStack align="start" gap="16px">
      <Header title={t("topics")} description={t("topicsDescription")} />
      <ItemList items={items} />
    </VStack>
  );
}
