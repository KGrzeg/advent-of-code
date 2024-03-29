import test from 'ava';
import { process } from './part1.mjs'


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
    "4361");
});


test('right_edge', t => {
  t.is(process(`467..114.1
...*.....*
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`),
    "4362");
});

test('corner_rb', t => {
  t.is(process(`467..114.1
...*.....*
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*...1
.664.598.#`),
    "4363");
});

test('corner_lt', t => {
  t.is(process(`1!...114.1
...*.....*
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*...1
.664.598.#`),
    "3897");
});

test('clones', t => {
  t.is(process(`1.1.1
.@...
1.1.1`),
    "4");
});


test('dense', t => {
  t.is(process(`1@1
...`),
    "2");
});
