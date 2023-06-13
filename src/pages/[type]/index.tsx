import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularPages } from "../../model/page";
import { useTranslation } from "next-i18next";
import { VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { ItemList } from "../../components/ItemList";
import { ValidTypes } from "../../db/fs";

export async function getServerSideProps({ locale, params }: any) {
  const { type } = params;
  if (!ValidTypes.includes(type)) {
    return {
      notFound: true,
    };
  }

  const items = await import("../../generated/" + type + ".json").then(
    (m) => m.default
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      items,
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
