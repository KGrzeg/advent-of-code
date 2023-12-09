import test from "ava";
import { calculate } from "./part1.mjs";

test("it_works", (t) => {
  t.is(
    calculate(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`),
    "6440"
  );

  t.is(
    calculate(`23456 1000
34567 100
45678 10
`),
    "1230"
  );
  
  t.is(
    calculate(`66549 1000
22344 100
22234 10
`),
    "1230"
  );
});
