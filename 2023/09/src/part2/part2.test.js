import test from "ava";
import { calculate } from "./part2.mjs";

test("it_works", (t) => {
  t.is(
    calculate(`10 13 16 21 30 45
`),
    "5"
  );

  t.is(
    calculate(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`),
    "2"
  );
});
