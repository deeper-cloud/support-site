import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { getPopularPages } from "../model/page";

export async function getServerSideProps({ locale }: any) {
  const popularPages = await getPopularPages();

  return {
    props: {
      popularPages,
      // ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export const Aside = ({
  popularPages = [],
}: {
  popularPages: { link: string; name: string }[];
}) => {
  const { t } = useTranslation("common");
  return (
    <Card>
      <CardHeader>
        <Heading as="h4" size="md">
          {t("popularPages")}
        </Heading>
      </CardHeader>
      <CardBody minH="60vh">
        <VStack>
          {popularPages.map((page) => (
            <Link key={page.link} href={page.link}>
              <Text>{page.name}</Text>
            </Link>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};
