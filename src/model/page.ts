import client from "../db/redis";
import questions from "../generated/questions.json";

const PageViewHashKey = "support_site:page_views";

export async function getPopularPages(amount = 10) {
  const records = (await client.hgetall(PageViewHashKey)) as Record<
    string,
    string
  >;

  const pages = Object.entries(records)
    .map(([path, strViews]) => {
      return { path, views: parseInt(strViews) };
    })
    .sort((a, b) => b.views - a.views)
    .map((item) => item.path)
    .filter((link) => questions.find((item) => item.link === link))
    .map((link) => ({
      link,
      name: questions.find((item) => item.link === link)?.title || "",
    }));

  const nonCountedPages = questions.filter(
    (item) => !pages.find((page) => page.link === item.link)
  );

  while (pages.length < amount) {
    const { link, title } = nonCountedPages.pop() as any;
    pages.push({ link, name: title });
  }

  return pages.slice(0, amount);
}

export async function incrementPageView(path: string) {
  await client.hincrby(PageViewHashKey, path, 1);
}
