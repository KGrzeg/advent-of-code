const fs = require("fs");

const text = fs.readFileSync(process.stdin.fd, "utf8");
const lines = text.split("\n").filter(l => l);

let allSides = 0;
const map = [];
const cubes = []

function insertCube(x, y, z) {
  if (map[x] === undefined)
    map[x] = [];
  if (map[x][y] === undefined)
    map[x][y] = [];

  map[x][y][z] = [x, y, z];
  cubes.push([x, y, z]);
}
function cubeExists(x, y, z) {
  return !!(map?.[x]?.[y]?.[z])
}

lines.forEach(line => {
  insertCube(...line.split(",").map(n => parseInt(n)));
});

for (let i = 0; i < cubes.length; ++i) {
  const cube = cubes[i];
  let sides = 6;

  [-1, 1].forEach(sign => {
    const [x, y, z] = [...cube];
    if (cubeExists(x + sign, y, z))
      --sides;
    if (cubeExists(x, y + sign, z))
      --sides;
    if (cubeExists(x, y, z + sign))
      --sides;
  })

  allSides += sides;
}

console.log(allSides);
