import test from "ava";
import { calculate, lcm } from "./part2.mjs";

test("it_works", t => {
  t.is(
    calculate(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`),
    "6"
  );

  t.is(
    calculate(`LRLR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`),
    "6"
  );
});

test("LCM", t => {
  t.is(lcm(9, 12), 36);
  t.is(lcm(2, 20), 20);
  t.is(lcm(21, 7), 21);
  t.is(lcm(21, 22), 462);
  t.is(lcm(1, 3, 9), 9);
  t.is(lcm(7, 12, 25), 2100);
})
