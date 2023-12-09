import test from "ava";
import { calculate } from "./part1.mjs";

test("it_works", (t) => {
  t.is(
    calculate(`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`),
    "2"
  );
});
