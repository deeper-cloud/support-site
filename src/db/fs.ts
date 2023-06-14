import fs from "fs";

export const ValidTypes = fs
  .readdirSync("../generated", "utf-8")
  .map((file) => file.replace(".json", ""));
