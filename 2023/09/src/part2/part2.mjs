function sum(arr) {
  return arr.reduce((acc, n) => acc + n, 0);
}
function zeros(arr) {
  return arr.every(n => n === 0);
}

export function calculate(input) {
  const lines = input.split('\n');
  lines.pop();

  const histories = lines.map(l => l.split(' ').map(n => parseInt(n)));

  const previous = histories.map(history => {
    const sequences = [];
    sequences[0] = history;
    let layer = 0;

    //fill in the pyramid
    do {
      const lastSeq = sequences[layer];
      ++layer;
      const seq = [];
      sequences[layer] = seq;

      for (let i = 1; i < lastSeq.length; ++i) {
        seq.push(lastSeq[i] - lastSeq[i - 1]);
      }

    } while (!zeros(sequences[layer]))

    //append numbers
    layer = sequences.length - 2;
    const leftColumn = new Array(sequences.length);
    leftColumn[layer] = sequences[layer][0];

    while (layer > 0) {
      const newValue = sequences[layer - 1][0] - leftColumn[layer];
      leftColumn[layer - 1] = newValue;

      --layer;
    }

    return leftColumn[0];
  })

  return `${sum(previous)}`;
}
