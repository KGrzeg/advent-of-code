import test from 'ava';
import { process } from './part2.mjs'


test('it_works', t => {
  t.is(process(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`),
    "467835");
});
