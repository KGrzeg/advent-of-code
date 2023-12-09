//Least Common Multiple
export function lcm(...a) {
  const [biggest, ...rest] = a.sort().reverse();
  let multiple = biggest;

  while (true) {
    if (rest.every(n => (multiple % n) === 0))
      return multiple;

    multiple += biggest;
  }
}

export function calculate(input) {
  const lines = input.split('\n');
  const moves = lines[0];
  const paths = {};
  const startNodes = [];

  for (let i = 2; i < lines.length - 1; ++i) {
    const re = /(\S+) = \((\S+), (\S+)\)/;
    const [_, source, left, right] = re.exec(lines[i]);
    paths[source] = {
      L: left,
      R: right,
      name: source,
      endNode: source[source.length - 1] === 'Z',
    };
    if (source[source.length - 1] === 'A')
      startNodes.push(source);
  }

  let step = 0;
  let routes = startNodes.map(name => paths[name]);
  const cycles = startNodes.map(_ => 0);
  do {
    if (cycles.every(c => c !== 0))
      break;

    const subStep = step % moves.length;

    routes.forEach((r, i) => {
      if (r.endNode) {
        cycles[i] = step;
      }
    });

    const move = moves[subStep];
    const moveToArr = routes.map(r => r[move]);
    routes = moveToArr.map(m => paths[m]);
    ++step;
  } while (true);

  return `${lcm(...cycles)}`;
}
