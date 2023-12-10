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

const GasTile = {
  Empty: ' ',
  Pipe: '#',
  Open: 'O',
  Closed: 'X',
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

function getGasSiblingsVectors(tile) {
  const above = moveVector(tile.x * 2, tile.y * 2, Direction.Up);
  const below = moveVector(tile.x * 2, tile.y * 2, Direction.Down);
  const left = moveVector(tile.x * 2, tile.y * 2, Direction.Left);
  const right = moveVector(tile.x * 2, tile.y * 2, Direction.Right);

  switch (tile.type) {
    case Tile.NS: {
      return [above, below];
    }
    case Tile.NE: {
      return [above, right];
    }
    case Tile.NW: {
      return [above, left];
    }
    case Tile.SE: {
      return [below, right];
    }
    case Tile.SW: {
      return [below, left];
    }
    case Tile.EW: {
      return [left, right];
    }
  }
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

  do {
    last.ends[0] = next;
    next.ends[1] = last;
    last.closed = false;
    next.closed = false;

    if (next === start)
      break;

    const nnext = getNext(next, last, map);
    last = next;
    next = nnext;
  } while (true);
}

function makeGasMap(start, map) {
  const gasMap = [];

  const gWidth = map[0].length + map[0].length - 1;
  const gHeight = map.length + map.length - 1;

  for (let y = 0; y < gHeight; ++y) {
    gasMap[y] = new Array(gWidth).fill(GasTile.Empty);
  }

  gasMap[start.y * 2][start.x * 2] = GasTile.Pipe;
  let tile = start.ends[0];

  while (tile !== start) {
    const [s1, s2] = getGasSiblingsVectors(tile);

    gasMap[tile.y * 2][tile.x * 2] = GasTile.Pipe;
    gasMap[s1[1]][s1[0]] = GasTile.Pipe;
    gasMap[s2[1]][s2[0]] = GasTile.Pipe;

    tile = tile.ends[0];
  }

  return gasMap;
}

function markMaps(gasMap, pipeMap) {
  const queue = [[0, 0]];

  while (queue.length) {
    const t = queue.pop();
    if (
      t[0] >= gasMap[0].length ||
      t[0] < 0 ||
      t[1] >= gasMap.length ||
      t[1] < 0
    )
      continue;

    if (gasMap[t[1]][t[0]] === GasTile.Empty) {
      gasMap[t[1]][t[0]] = GasTile.Open;

      if (t[0] % 2 == 0 && t[1] % 2 == 0)
        pipeMap[t[1] / 2][t[0] / 2].closed = false;

      queue.push(
        moveVector(t[0], t[1], Direction.Up),
        moveVector(t[0], t[1], Direction.Right),
        moveVector(t[0], t[1], Direction.Down),
        moveVector(t[0], t[1], Direction.Left),
      )
    }
  }
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
        ends: [],
        closed: true
      };

      if (letter === Tile.Start)
        start = tile;

      return tile;
    });
  });

  makeConnections(start, map);
  const gasMap = makeGasMap(start, map);

  markMaps(gasMap, map);

  const closed = _.flatten(map).reduce((acc, tile) => acc + (tile.closed ? 1 : 0), 0);

  //draw  gas map
  // console.log(gasMap.map(line => line.join('')).join('\n'));

  //draw pipe map
  // console.log(map.map(line => line.map(tile => {
  //   if (tile.ends.length) {
  //     return '#';
  //   }
  //   if (tile.closed) {
  //     return '.';
  //   }
  //   return ' ';
  // }).join('')).join('\n'));

  return `${closed}`;
}
