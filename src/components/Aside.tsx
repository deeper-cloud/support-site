import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export const Aside = ({
  popularPages = [],
}: {
  popularPages: { link: string; name: string }[];
}) => {
  const { t } = useTranslation("common");
  return (
    <Card bg="secondary">
      <CardBody minH="512px" height="fit-content">
        <Heading as="h4" size="md">
          {t("popularPages")}
        </Heading>
        <VStack align="start" gap="12px" paddingTop="18px">
          {popularPages.map((page) => (
            <Link key={page.link} href={page.link}>
              <Button variant="outline" size="sm">
                {page.name}
              </Button>
            </Link>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};
