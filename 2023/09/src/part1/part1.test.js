import test from "ava";
import { calculate } from "./part1.mjs";

test("it_works", (t) => {
  t.is(
    calculate(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`),
    "114"
  );

  t.is(
    calculate(`-1 -6 -11 -16 -21 -26 -31 -36 -41 -46 -51 -56 -61 -66 -71 -76 -81 -86 -91 -96 -101
`),
    "-106"
  );

  t.is(
    calculate(`12 19 44 94 170 273 428 741 1505 3379 7690 16965 35920 73403 146423 288884 571005 1142650 2328614 4832776 10161751
`),
    "21474718"
  );
});