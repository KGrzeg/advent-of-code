function simulate(boost, time) {
  const restTime = time - boost;
  return restTime * boost;
}

export function calculate(input) {
  const lines = input.split('\n');

  const time = parseInt(lines[0].replaceAll(/[Time\:\s]+/g, ''));
  const record = parseInt(lines[1].replaceAll(/[Distance\:\s]+/g, ''));
  let winPossibilities = 0;

  for (let t = 1; t < time; ++t) {
    if (simulate(t, time) > record)
      winPossibilities++;
  }

  return `${winPossibilities}`;
}
