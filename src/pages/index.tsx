import { Heading, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

// export async function getServerSideProps(context: any) {
//   const { locale } = context;
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }

export default function Page() {
  // const { t } = useTranslation("common");
  return (
    <VStack>
      <Head>
        <title>Deeper: Support & Help</title>
      </Head>
      {/* <Heading>{t("How can we help?")}</Heading> */}
    </VStack>
  );
}
