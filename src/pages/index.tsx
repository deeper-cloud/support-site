import {
  Button,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Fade,
  Collapse,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { SearchField } from "../components/SearchField";
import { useCallback, useEffect, useRef, useState } from "react";
import { Item, ItemList } from "../components/ItemList";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getStaticProps({ locale }: any) {
  const [topics, questions] = await Promise.all([
    import("../generated/topics.json"),
    import("../generated/questions.json"),
  ]);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      topicCount: topics.length,
      questionCount: questions.length,
    },
  };
}

interface QuickLinkSectionProps {
  icon?: JSX.Element;
  title: string;
  description: string;
  action: string;
  link: string;
}

function QuickLinkSection({
  icon,
  title,
  description,
  action,
  link,
}: QuickLinkSectionProps) {
  const router = useRouter();
  return (
    <VStack align="start">
      {icon}
      <Heading>{title}</Heading>
      <Text h="64px">{description}</Text>
      {action && (
        <Button variant="outline">
          <Link href={link}>{action}</Link>
        </Button>
      )}
    </VStack>
  );
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
      </Head>
      <VStack align="start" gap="48px" minHeight="calc(100vh - 48px)">
        <SearchField
          placeholder={t("searchPlaceholder")}
          title={t("howCanWeHelp")}
          value={query}
          onChange={(e: any) => setQuery(e.target.value)}
          loading={Boolean(query) && loading}
        />
        <Collapse in={!Boolean(query)}>
          <SimpleGrid columns={2} gap="32px">
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
