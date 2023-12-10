import test from "ava";
import { calculate } from "./part2.mjs";

test("it_works", (t) => {
  t.is(
    calculate(`Time:      7  15   30
Distance:  9  40  200
`),
    "71503"
  );
});
