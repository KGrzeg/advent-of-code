import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILENAME = "part1.in";

function dododo(data) {
  let safe_reports = 0;

  const lines = data.split("\n").filter((line) => line);
  const nums = lines.map((line) => line.split(" ").map((num) => Number(num)));

  for (let line of nums) {
    let is_growing = null;
    let ok = true;
    for (let i = 1; i < line.length; ++i) {
      const diff = line[i] - line[i - 1];
      // console.log(`compare ${line[i]} and ${line[i-1]} -> ${diff}`);

      if (diff === 0 || Math.abs(diff) > 3) {
        ok = false;
        break;
      }
      if (diff > 0) {
        if (is_growing === false) {
          ok = false;
          break;
        } else {
          is_growing = true;
        }
      } else {
        if (is_growing === true) {
          ok = false;
          break;
        } else {
          is_growing = false;
        }
      }
    }
    // console.log(ok);
    if (ok) safe_reports++;
  }

  return safe_reports;
}

function main() {
  const filePath = path.join(__dirname, FILENAME);
  const input = fs.readFileSync(filePath, "utf8");

  const result = dododo(input);
  console.log(result);
}

main();
