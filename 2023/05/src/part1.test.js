import test from "ava";
import { process, Mapper } from "./part1.mjs";

test("mapper", (t) => {
  const m = new Mapper();

  m.add_range(10, 0, 3);

  t.is(m.map_value(0), 10);
  t.is(m.map_value(1), 11);
  t.is(m.map_value(2), 12);
  t.is(m.map_value(3), 3);
  t.is(m.map_value(4), 4);
});

test("mapper chain", (t) => {
  const m1 = new Mapper();
  const m2 = new Mapper(m1);

  m2.add_range(10, 0, 3);

  t.is(m1.next, m2);
  t.is(m1.chain(0), 10);
  t.is(m1.chain(1), 11);
  t.is(m1.chain(2), 12);
  t.is(m1.chain(3), 3);
  t.is(m1.chain(4), 4);
});

test("it_works", (t) => {
  t.is(
    process(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`),
    "35"
  );
});
