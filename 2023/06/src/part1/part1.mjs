function simulate(boost, time) {
  const restTime = time - boost;
  return restTime * boost;
}

export function calculate(input) {
  const lines = input.split('\n');

  const times = lines[0].split(/\s+/).map(n => parseInt(n)).filter(n => !isNaN(n));
  const records = lines[1].split(/\s+/).map(n => parseInt(n)).filter(n => !isNaN(n));
  const winPossibilities = new Array(times.length).fill(0);

  for (let i = 0; i < times.length; ++i) {
    const time = times[i];
    const record = records[i];

    for (let t = 1; t < time; ++t) {
      if (simulate(t, time) > record)
        winPossibilities[i]++;
    }
  }

  const result = winPossibilities.reduce((acc, d) => acc * d, 1);

  return `${result}`;
}
