export class Range {
  start = 0;
  end = 0;

  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  contains(val) {
    return this.start <= val && val < this.end;
  }

  intersection_part(r) {
    const end = r.end;
    const start = r.start;

    if (end < this.start || this.end < start) return false;

    return new Range(Math.max(start, this.start), Math.min(end, this.end));
  }

  get length() {
    return this.end - this.start;
  }
}

export class Mapper {
  ranges = [];
  next = null;

  constructor(parent) {
    if (parent) {
      parent.next = this;
    }
  }

  add_range(to, from, len) {
    const shift = to - from;
    this.ranges.push({
      r: new Range(from, from + len),
      shift,
    });
  }

  map_range(test_range) {
    const entry_points = new Set();
    entry_points.add(test_range.start);
    entry_points.add(test_range.end);

    for (const range of this.ranges) {
      const { r } = range;
      const inter = test_range.intersection_part(r);
      if (inter !== false) {
        entry_points.add(inter.start);
        entry_points.add(inter.end);
      }
    }

    const points = [...entry_points].sort();
    const entry_ranges = [];
    for (let i = 1; i < points.length; ++i) {
      entry_ranges.push(new Range(points[i - 1], points[i]));
    }
    return entry_ranges.map(
      (range) =>
        new Range(
          this.map_value(range.start),
          this.map_value(range.end - 1) + 1
        )
    );
  }

  chain_ranges(ranges) {
    const ret_ranges = [];

    for (const range of ranges) {
      const next_ranges = this.map_range(range);
      if (this.next) {
        ret_ranges.push(...this.next.chain_ranges(next_ranges));
      } else {
        ret_ranges.push(...next_ranges);
      }
    }

    return ret_ranges;
  }

  map_value(val) {
    for (const range of this.ranges) {
      const { r, shift } = range;
      if (val >= r.start && val < r.end) {
        return val + shift;
      }
    }

    return val;
  }

  chain_val(val) {
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

  let index = 2;
  index = seedToSoil.parse_all(lines, index);
  index = soilToFertilizer.parse_all(lines, index);
  index = fertilizerToWater.parse_all(lines, index);
  index = waterToLight.parse_all(lines, index);
  index = lightToTemperature.parse_all(lines, index);
  index = temperatureToHumidity.parse_all(lines, index);
  index = humidityToLocation.parse_all(lines, index);

  const rawSeeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((s) => parseInt(s));

  const locations = [];
  for (let i = 0; i < rawSeeds.length; i += 2) {
    const range = new Range(rawSeeds[i], rawSeeds[i] + rawSeeds[i + 1]);
    const found_ranges = seedToSoil.chain_ranges([range]);
    found_ranges.forEach((r) => locations.push(r.start, r.end));
  }

  const lowest = locations
    .filter((l) => l)
    .reduce((acc, l) => Math.min(acc, l), Infinity);

  return `${lowest}`;
}
