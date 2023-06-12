import { Heading, VStack, Text } from "@chakra-ui/react";
import { ItemList } from "../../components/ItemList";
import { useTranslation } from "next-i18next";
import questions from "../../generated/questions.json";
import { Header } from "../../components/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularPages } from "../../model/page";

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      items: questions,
      popularPages: await getPopularPages(),
    },
  };
}

export default function Questions({ items }: any) {
  const { t } = useTranslation("common");
  return (
    <VStack align="start" gap="16px">
      <Header title={t("questions")} description={t("questionsDescription")} />
      <ItemList items={items} />
    </VStack>
  );
}
