require("dotenv").config({ path: ".env.local" });

const { globSync: glob } = require("glob");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

async function resolveFromOpenAI(question: string): Promise<string> {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "When I ask you to fill in JSON data you should only fill in the missing data and not change the existing data.",
      },
      {
        role: "user",
        content: question,
      },
    ],
    temperature: 0.6,
  });
  return res.data.choices[0].message.content;
}

async function parseMetadata(path: string, type: string) {
  const content = fs.readFileSync(path).toString();

  const titleRegex = /# (.*)\n/;
  const descriptionRegex = /## .*\n(.*)\n/;

  let title = content.match(titleRegex)?.[1];

  if (title === undefined) {
    throw new Error(`Could not find title in ${path}`);
  }

  let description = content.match(descriptionRegex)?.[1] ?? "";

  let data = {
    title,
    description,
    tags: [],
    type,
  };

  const result = await resolveFromOpenAI(
    `Can you fill in any missing description & tags in the following JSON object while keeping the tags to a short one word that relates to the other fields and return it as just a JSON object?\n${JSON.stringify(
      data
    )}`
  );

  data = JSON.parse(result);
  return data;
}

async function main() {
  // get all markdown files
  // sort all files by category
  const filesByDirectory = new Map<string, string[]>();
  glob("src/content/**/*.md")
    .map((f: string) => f.split("/").slice(-2)) // get last two parts of the path
    .forEach(([category, fileName]: string[]) => {
      if (!filesByDirectory.has(category)) {
        filesByDirectory.set(category, []);
      }
      filesByDirectory.get(category)?.push(fileName.replace(".md", ""));
    });
  console.log("Sorted all files by category");

  // delete all generated files in the folder
  glob("src/generated/*.json").forEach(fs.unlinkSync);
  console.log("Deleted all generated files");

  const keys = Array.from(filesByDirectory.keys());
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const files = filesByDirectory.get(key) as string[];

    const metadataArr = await Promise.all(
      files.map(async (file) => {
        try {
          console.log(`Parsing ${file}`);
          return {
            id: file,
            link: `/${key}/${file}`,
            ...(await parseMetadata(`src/content/${key}/${file}.md`, key)),
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    );

    console.log(`Writing ${key}.json`);
    fs.writeFileSync(`src/generated/${key}.json`, JSON.stringify(metadataArr));
  }
}

main();
