import fs from "fs";

export const ValidTypes = fs
  .readdirSync("./src/generated", "utf-8")
  .map((file) => file.replace(".json", ""));
