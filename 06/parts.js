const fs = require("fs");

const line = fs.readFileSync(process.stdin.fd, "utf8");

const ribka_store = [];
ribka_store.length = 9;
ribka_store.fill(0);

const days = 256; //! Here, update me!

const adamsAndEves = line
  .split(",")
  .map(n => parseInt(n));

adamsAndEves.forEach(f => {
  ribka_store[f]++;
});

function simulateDay() {
  const newRibkas = ribka_store[0];
  ribka_store.shift();
  ribka_store[6] += newRibkas;
  ribka_store[8] = newRibkas;
}

for (let i = 0; i < days; i++)
  simulateDay();

const sumOfRibkas = ribka_store.reduce(
  (acc, f) => acc + f, 0
);
console.log(sumOfRibkas);
