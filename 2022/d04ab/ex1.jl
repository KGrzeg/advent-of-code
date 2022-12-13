contained = 0

while true
  line = readline()
  length(line) == 0 && break

  elves = split(line, ',')
  range1 = [parse(Int, x) for x in split(elves[1], '-')]
  range2 = [parse(Int, x) for x in split(elves[2], '-')]

  if range1[1] <= range2[1] && range2[2] <= range1[2]
    global contained += 1
  elseif range2[1] <= range1[1] && range1[2] <= range2[2]
    global contained += 1
  end
end

println(contained)
