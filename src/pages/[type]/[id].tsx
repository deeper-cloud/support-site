import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPopularPages } from "../../model/page";
import { Box } from "@chakra-ui/react";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import fs from "fs/promises";
import { ValidTypes } from "../../db/fs";

export async function getServerSideProps({ locale, params }: any) {
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
    },
  };
}

export default function Page({ doc = "" }: any) {
  const ast = Markdoc.parse(doc);
  const content = Markdoc.transform(ast);
  return <Box as="article">{Markdoc.renderers.react(content, React)}</Box>;
}
