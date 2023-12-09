import test from "ava";
import { calculate } from "./part2.mjs";

test("it_works", (t) => {
  t.is(
    calculate(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`),
    "5905"
  );
});
