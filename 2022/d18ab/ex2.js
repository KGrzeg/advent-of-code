const fs = require("fs");
const { execPath } = require("process");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(l => l);

let allSides = 0;
const map = [];
const mapBounds = {
  min: [Infinity, Infinity, Infinity],
  max: [-Infinity, -Infinity, -Infinity],
};
const cubes = []
const movesMatrix = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]
const interiorCache = {};

function insertCube(x, y, z) {
  if (map[x] === undefined)
    map[x] = [];
  if (map[x][y] === undefined)
    map[x][y] = [];

  map[x][y][z] = [x, y, z];
  cubes.push([x, y, z]);
  mapBounds.min[0] = Math.min(x, mapBounds.min[0])
  mapBounds.min[1] = Math.min(y, mapBounds.min[1])
  mapBounds.min[2] = Math.min(z, mapBounds.min[2])
  mapBounds.max[0] = Math.max(x, mapBounds.max[0])
  mapBounds.max[1] = Math.max(y, mapBounds.max[1])
  mapBounds.max[2] = Math.max(z, mapBounds.max[2])
}
function cubeExists(x, y, z) {
  return !!(map?.[x]?.[y]?.[z])
}
function inBound(x, y, z) {
  return (
    x >= mapBounds.min[0] && x <= mapBounds.max[0] &&
    y >= mapBounds.min[1] && y <= mapBounds.max[1] &&
    z >= mapBounds.min[2] && z <= mapBounds.max[2]
  )
}
function getSiblings(x, y, z) {
  return movesMatrix.map(move => [move[0] + x, move[1] + y, move[2] + z])
}
function expandInterior(sx, sy, sz) {
  const checkedCubes = [];
  const toCheck = [];
  let interior = true;

  if (cubeExists(sx, sy, sz)) {
    console.log("OMG!!!!!!!!")
  }

  toCheck.push([sx, sy, sz])

  while (toCheck.length) {
    const cube = toCheck.pop();
    const key = cube.join(',');

    if (checkedCubes.indexOf(key) !== -1) continue;
    checkedCubes.push(key);

    if (!inBound(...cube)) {
      interior = false;
      break;
    }

    if (cubeExists(...cube)) continue;

    toCheck.push(...getSiblings(...cube));
  }

  return {
    checkedCubes,
    interior
  }
}

function isInterior(x, y, z) {
  const key = [x, y, z].join(',');
  if (interiorCache[key] !== undefined) return interiorCache[key];

  const data = expandInterior(x, y, z);

  data.checkedCubes.forEach(cube => {
    interiorCache[cube] = data.interior;
  });
  return data.interior;
}

lines.forEach(line => {
  insertCube(...line.split(",").map(n => parseInt(n)));
});

for (let i = 0; i < cubes.length; ++i) {
  const cube = cubes[i];
  let sides = 6;

  for (let move of movesMatrix) {
    let x = cube[0] + move[0], y = cube[1] + move[1], z = cube[2] + move[2];
    if (cubeExists(x, y, z) || isInterior(x, y, z))
      --sides;
  }

  allSides += sides;
}

console.log(allSides);

// 2594 nie
// 1420 nie, za mało
// 6481 oczywiście nie, sprawdzałem czy AOC ma buga
// 2604
