import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { process } from "./part2.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILENAME = "input.txt";

function main() {
  const filePath = path.join(__dirname, FILENAME);
  const input = fs.readFileSync(filePath, "utf8");

  const result = process(input);
  console.log(result);
}

main();
