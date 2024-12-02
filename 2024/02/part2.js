import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILENAME = "part1.in";

function* pairs(numbers) {
  for (let i = 1; i < numbers.length; ++i) {
    yield [numbers[i - 1], numbers[i]];
  }
}

function* with_holes(numbers) {
  yield numbers;
  for (let i_to_skip = 0; i_to_skip < numbers.length; ++i_to_skip) {
    yield numbers.filter((_, index) => index !== i_to_skip);
  }
}

function is_report_safe(numbers) {
  let is_growing = null;
  let ok = true;
  for (let i = 1; i < numbers.length; ++i) {
    const diff = numbers[i] - numbers[i - 1];

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
  return ok;
}

function dododo(data) {
  let safe_reports = 0;

  const lines = data.split("\n").filter((line) => line);
  const nums = lines.map((line) => line.split(" ").map((num) => Number(num)));

  for (let line of nums) {
    let ok = false;
    for (let variant of with_holes(line)) {
      if (is_report_safe(variant)){
        ok = true;
        break;
      }
    }
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
