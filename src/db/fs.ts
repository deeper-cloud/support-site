import fs from "fs";
import path from "path";

export const ValidTypes = fs
  .readdirSync(path.join(process.cwd(), "src", "generated"), "utf-8")
  .map((file) => file.replace(".json", ""));
