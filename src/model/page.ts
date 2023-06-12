// import redis from "redis";

const PageViewHashKey = "support_site:page_views";

// const client = redis.createClient({
//   url: process.env.REDIS_URL,
// });

export async function getPopularPages(amount = 5) {
  // const pages = await client.hGetAll(PageViewHashKey);

  // client.discard();

  return []
    .map(([key, value]) => {
      return { path: key, views: parseInt(value) };
    })
    .sort((a, b) => b.views - a.views)
    .slice(amount);
}
