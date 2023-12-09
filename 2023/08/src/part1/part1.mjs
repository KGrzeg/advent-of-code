export function calculate(input) {
  const lines = input.split('\n');
  const moves = lines[0];
  const paths = {};

  for (let i = 2; i < lines.length - 1; ++i) {
    const re = /(\S+) = \((\S+), (\S+)\)/;
    const [_, source, left, right] = re.exec(lines[i]);
    paths[source] = {
      L: left,
      R: right,
      name: source
    };
  }

  let step = 0;
  let path = paths['AAA'];
  do {
    if (path.name == 'ZZZ')
      break;

    const move = moves[step % moves.length];
    const moveTo = path[move];
    path = paths[moveTo];
    ++step;
  } while (true);

  return `${step}`;
}
