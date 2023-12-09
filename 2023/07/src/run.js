import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { calculate as part1 } from "./part1/part1.mjs";
import { calculate as part2 } from "./part2/part2.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILENAME = "input.txt";

function main() {
  const filePath = path.join(__dirname, FILENAME);
  const input = fs.readFileSync(filePath, "utf8");

  const part = process.argv[2] == 'part2' ? part2 : part1;

  const result = part(input);
  console.log(result);
}

main();
