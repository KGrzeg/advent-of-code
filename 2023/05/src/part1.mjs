export class Mapper {
  ranges = [];
  next = null;

  constructor(parent) {
    if (parent) {
      parent.next = this;
    }
  }

  add_range(to, from, len) {
    this.ranges.push({
      from,
      to,
      len,
    });
  }

  map_value(val) {
    for (const range of this.ranges) {
      if (val >= range.from && val < range.from + range.len) {
        return val + range.to - range.from;
      }
    }

    return val;
  }

  chain(val) {
    const v = this.map_value(val);

    if (this.next) {
      return this.next.chain(v);
    } else {
      return v;
    }
  }

  parse_line(line) {
    if (!line.length) return false;

    const nums = line.split(" ").map((n) => parseInt(n));
    this.add_range(...nums);
    return true;
  }

  parse_all(lines, start_index) {
    for (let i = start_index + 1; ; ++i) {
      if (i >= lines.length) return i;

      const line = lines[i];
      const con = this.parse_line(line);
      if (!con) return i + 1;
    }
  }
}

export function process(input) {
  const seedToSoil = new Mapper();
  const soilToFertilizer = new Mapper(seedToSoil);
  const fertilizerToWater = new Mapper(soilToFertilizer);
  const waterToLight = new Mapper(fertilizerToWater);
  const lightToTemperature = new Mapper(waterToLight);
  const temperatureToHumidity = new Mapper(lightToTemperature);
  const humidityToLocation = new Mapper(temperatureToHumidity);

  const lines = input.split("\n");

  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((s) => parseInt(s));

  let index = 2;
  index = seedToSoil.parse_all(lines, index);
  index = soilToFertilizer.parse_all(lines, index);
  index = fertilizerToWater.parse_all(lines, index);
  index = waterToLight.parse_all(lines, index);
  index = lightToTemperature.parse_all(lines, index);
  index = temperatureToHumidity.parse_all(lines, index);
  index = humidityToLocation.parse_all(lines, index);

  const spots = seeds.map((s) => seedToSoil.chain(s));
  const lowest = spots.reduce((acc, s) => Math.min(acc, s), Infinity);

  return `${lowest}`;
}
