import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularPages } from "../../model/page";
import { useTranslation } from "next-i18next";
import { VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { ItemList } from "../../components/ItemList";
import fs from "fs/promises";
import { ValidTypes } from "../../db/fs";

export async function getServerSideProps({ locale, params }: any) {
  const { type } = params;
  if (!ValidTypes.includes(type)) {
    return {
      notFound: true,
    };
  }

  const questions = await fs.readFile(`./src/generated/${type}.json`, "utf-8");

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      items: JSON.parse(questions),
      popularPages: await getPopularPages(),
    },
  };
}

export default function TypePage({ items }: any) {
  const { t } = useTranslation("common");
  return (
    <VStack align="start" gap="64px">
      <Header title={t("questions")} description={t("questionsDescription")} />
      <ItemList items={items} />
    </VStack>
  );
}
