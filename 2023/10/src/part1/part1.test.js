import test from "ava";
import { calculate } from "./part1.mjs";

test("it_works", (t) => {
  t.is(
    calculate(`.....
.S-7.
.|.|.
.L-J.
.....
`),
    "4"
  );

  t.is(
    calculate(`..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`),
    "8"
  );
});
