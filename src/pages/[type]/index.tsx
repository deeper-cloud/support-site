import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularPages } from "../../model/page";
import { useTranslation } from "next-i18next";
import { VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { ItemList } from "../../components/ItemList";
import { ValidTypes } from "../../db/static";
import Head from "next/head";
import { upperFirst } from "lodash";

export async function getServerSideProps({ locale = "en-US", params }: any) {
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
      type,
    },
  };
}

export default function Page({ items, type }: any) {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{upperFirst(type)}</title>
      </Head>
      <VStack align="start" gap="64px">
        <Header
          title={t("questions")}
          description={t("questionsDescription")}
        />
        <ItemList items={items} />
      </VStack>
    </>
  );
}
