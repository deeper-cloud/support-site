// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Fuse from "fuse.js";

import questions from "../../generated/questions.json";
import topics from "../../generated/topics.json";
import { Item } from "../../components/ItemList";

type Data = {
  data?: Item[];
  error?: string;
};

export const AllItems = [...questions, ...topics];

const fuse = new Fuse(AllItems, {
  keys: ["title", "description", "tags"],
  isCaseSensitive: false,
  findAllMatches: true,
  threshold: 0.1,
  minMatchCharLength: 1,
  shouldSort: true,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const search = req.query?.q;
  if (!search) {
    res.status(400).json({ error: "Search value is required" });
    return;
  }
  if (typeof search !== "string") {
    res.status(400).json({ error: "Search value must be a string" });
    return;
  }

  const results = fuse.search(search).map((r) => r.item) as Item[];
  res.status(200).json({ data: results.reverse() });
}
