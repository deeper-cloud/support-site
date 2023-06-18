import { SimpleGrid, VStack, Collapse } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { SearchField } from "../components/SearchField";
import { useCallback, useEffect, useRef, useState } from "react";
import { Item, ItemList } from "../components/ItemList";
import { getPopularPages } from "../model/page";
import { QuickLinkSection } from "../components/QuickLinksSection";

export async function getServerSideProps({ locale = "en-US" }: any) {
  const [topics, questions] = await Promise.all([
    import("../generated/topics.json"),
    import("../generated/questions.json"),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      topicCount: topics.length,
      questionCount: questions.length,
      popularPages: await getPopularPages(),
    },
  };
}

function useDebounce(fn: any, delay: number) {
  const ref = useRef<number>(-1);

  const debouncedFN = useCallback(() => {
    clearTimeout(ref.current);
    ref.current = window.setTimeout(fn, delay);
  }, [ref, fn, delay]);

  return debouncedFN;
}

function useResults(query: string) {
  const [results, setResults] = useState([] as Item[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchResults = useCallback(() => {
    if (query === "") return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    fetch(`/api/search?q=${query}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((res) => res.data)
      .then(setResults)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [query]);

  const debouncedFetchResults = useDebounce(fetchResults, 500);

  useEffect(() => {
    setLoading(true);
  }, [query]);
  useEffect(debouncedFetchResults, [query, debouncedFetchResults]);

  return [results, loading, error] as const;
}

export default function Page({
  topicCount,
  questionCount,
}: {
  topicCount: number;
  questionCount: number;
}) {
  const { t } = useTranslation("common");
  const [query, setQuery] = useState("");
  const [results, loading] = useResults(query); //TODO: handle error

  return (
    <>
      <Head>
        <title>Deeper: Support & Help</title>
        <meta
          name="description"
          content="Deeper is an end-to-end platform for building and managing your
          restaurant operation"
        />
      </Head>
      <VStack align="start" gap="48px" minHeight="calc(100vh - 48px)">
        <SearchField
          placeholder={t("searchPlaceholder")}
          title={t("howCanWeHelp")}
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          loading={Boolean(query) && loading}
        />
        <Collapse in={!Boolean(query)} style={{ width: "100%" }}>
          <SimpleGrid minChildWidth="256px" gap="32px" w="100%">
            <QuickLinkSection
              title={t("resolveIssues")}
              description={t("resolveIssuesDescription")}
              action={t("resolveIssuesAction", { count: questionCount })}
              link="/questions"
            />
            <QuickLinkSection
              title={t("faqs")}
              description={t("faqDescription")}
              action={t("faqAction", { count: topicCount })}
              link="/topics"
            />
          </SimpleGrid>
        </Collapse>
        <Collapse in={Boolean(query)}>
          <ItemList title={t("results")} items={results} />
        </Collapse>
      </VStack>
    </>
  );
}
