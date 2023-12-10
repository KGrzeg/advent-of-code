function sum(arr) {
  return arr.reduce((acc, n) => acc + n, 0);
}
function zeros(arr) {
  return arr.every(n => n === 0);
}

function last(arr) {
  return arr[arr.length - 1];
}

export function calculate(input) {
  const lines = input.split('\n');
  lines.pop();

  const histories = lines.map(l => l.split(' ').map(n => parseInt(n)));

  const nexts = histories.map(history => {
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

    while (layer > 0) {
      const newValue = last(sequences[layer - 1]) + last(sequences[layer]);
      sequences[layer - 1].push(newValue);

      --layer;
    }

    return last(sequences[0]);
  })

  return `${sum(nexts)}`;
}
