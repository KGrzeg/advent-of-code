import _ from 'lodash';

const Tile = {
  NS: '|',
  EW: '-',
  NE: 'L',
  SE: 'F',
  SW: '7',
  NW: 'J',
  Start: 'S',
  Empty: '.',
}

const Direction = {
  Left: 1,
  Up: 2,
  Right: 3,
  Down: 4
};

function moveVector(x, y, dir, length = 1) {
  let vx = 0, vy = 0;

  switch (dir) {
    case Direction.Up: {
      vy = -1;
      break;
    }
    case Direction.Down: {
      vy = 1;
      break;
    }
    case Direction.Left: {
      vx = -1;
      break;
    }
    case Direction.Right: {
      vx = 1;
      break;
    }
    default: {
      throw new Error("Unsupporterd Direction");
    }
  }

  return [x + vx * length, y + vy * length];
}

function moveTile(tile, dir, map, length = 1) {
  const newPos = moveVector(tile.x, tile.y, dir, length);
  return map[newPos[1]][newPos[0]];
}

function getNext(tile, last, map) {
  const siblings = [];

  const above = moveTile(tile, Direction.Up, map);
  const below = moveTile(tile, Direction.Down, map);
  const left = moveTile(tile, Direction.Left, map);
  const right = moveTile(tile, Direction.Right, map);

  switch (tile.type) {
    case Tile.NS: {
      siblings.push(above);
      siblings.push(below);
      break;
    }
    case Tile.NE: {
      siblings.push(above);
      siblings.push(right);
      break;
    }
    case Tile.NW: {
      siblings.push(above);
      siblings.push(left);
      break;
    }
    case Tile.SE: {
      siblings.push(below);
      siblings.push(right);
      break;
    }
    case Tile.SW: {
      siblings.push(below);
      siblings.push(left);
      break;
    }
    case Tile.EW: {
      siblings.push(left);
      siblings.push(right);
      break;
    }
  }

  if (last === siblings[0])
    return siblings[1];

  return siblings[0];
}

function makeConnections(start, map) {
  let next = null;
  //above
  if ([Tile.NS, Tile.SE, Tile.SW].includes(moveTile(start, Direction.Up, map).type)) {
    next = moveTile(start, Direction.Up, map);

    //right
  } else if ([Tile.EW, Tile.SW, Tile.NW].includes(moveTile(start, Direction.Right, map).type)) {
    next = moveTile(start, Direction.Right, map);

    //below
  } else {
    next = moveTile(start, Direction.Down, map);
  }

  let last = start;
  let pieces = 0;

  do {
    last.ends[0] = next;
    next.ends[1] = last;
    ++pieces;

    if (next === start)
      break;

    const nnext = getNext(next, last, map);
    last = next;
    next = nnext;
  } while (true);

  map.pieces = pieces;
}

export function calculate(input) {
  let lines = input.split('\n');
  lines.pop();

  //fill in border of empties
  lines.unshift(".".repeat(lines[0].length))
  lines.push(".".repeat(lines[0].length))
  lines = lines.map(l => `.${l}.`);

  let start;

  const map = lines.map((line, y) => {
    return line.split('').map((letter, x) => {
      const tile = {
        type: letter,
        x,
        y,
        ends: []
      };

      if (letter === Tile.Start)
        start = tile;

      return tile;
    });
  });

  makeConnections(start, map);

  return `${Math.ceil(map.pieces / 2)}`;
}
