import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularPages } from "../../model/page";
import { Box } from "@chakra-ui/react";
import Markdoc from "@markdoc/markdoc";
import React, { useMemo } from "react";
import fs from "fs/promises";
import { ValidTypes } from "../../db/static";
import Head from "next/head";

export async function getServerSideProps({ locale = "en-US", params }: any) {
  const { id, type } = params;
  if (!ValidTypes.includes(type)) {
    return {
      notFound: true,
    };
  }

  const doc = await fs.readFile(`./src/content/${type}/${id}.md`, "utf-8");

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      doc,
      popularPages: await getPopularPages(),
      id,
    },
  };
}

export default function Page({ doc = "", id }: any) {
  const ast = Markdoc.parse(doc);
  const content = Markdoc.transform(ast);

  const formattedTitle = useMemo(() => {
    return id
      .split("-")
      .map((word: string) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }, [id]);

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <meta name="description" content="A detailed view of a post" />
      </Head>
      <Box as="article">{Markdoc.renderers.react(content, React)}</Box>
    </>
  );
}
