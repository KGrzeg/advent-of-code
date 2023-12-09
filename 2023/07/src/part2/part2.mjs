import _ from 'lodash';

const hierarchy = "J23456789TQKA";

const Types = {
  Five: 107,
  Four: 106,
  Fullhouse: 105,
  Three: 104,
  Two_Pairs: 103,
  Pair: 102,
  High: 101,
}

function compareCards(a, b) {
  return hierarchy.indexOf(b) - hierarchy.indexOf(a);
}

function findType(hand) {
  const splitted = hand.split('');
  const uniqueCount = _.countBy(splitted);
  let highestCount = 0;
  let numberOfPairs = 0;
  let jokers = uniqueCount['J'] || 0;
  delete uniqueCount['J'];

  for (const card in uniqueCount) {
    const count = uniqueCount[card];
    highestCount = Math.max(highestCount, count);

    if (count === 2)
      ++numberOfPairs;
  }

  if ((highestCount + jokers) === 5)
    return Types.Five;

  if ((highestCount + jokers) === 4)
    return Types.Four;

  if (highestCount === 3 && numberOfPairs == 1
    || numberOfPairs == 2 && jokers == 1)
    return Types.Fullhouse

  if ((highestCount + jokers) === 3)
    return Types.Three;

  if (numberOfPairs === 2)
    return Types.Two_Pairs;

  if ((highestCount + jokers) === 2)
    return Types.Pair;

  return Types.High;
}

function compareHands(h1, h2) {
  const t1 = findType(h1);
  const t2 = findType(h2);

  if (t1 != t2) {
    return t2 - t1;
  }

  for (let i = 0; i < h1.length; ++i) {
    if (h1[i] != h2[i])
      return compareCards(h1[i], h2[i]);
  }

  return 0;
}

export function calculate(input) {
  const lines = input.split("\n");
  lines.pop();

  const games = lines.map(l => {
    const [hand, bid] = l.split(' ');
    return {
      hand,
      bid: parseInt(bid)
    };
  });


  const sorted = games.sort((a, b) => compareHands(a.hand, b.hand));

  const sum = sorted.reduce((acc, game, i) => {
    const rank = sorted.length - i;
    return acc + rank * game.bid;
  }, 0);

  return `${sum}`;
}


// 250703596 too high
