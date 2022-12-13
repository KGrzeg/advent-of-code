overlapping = 0

while true
  line = readline()
  length(line) == 0 && break

  elves = split(line, ',')
  range1 = [parse(Int, x) for x in split(elves[1], '-')]
  range2 = [parse(Int, x) for x in split(elves[2], '-')]

  L1, R1 = [range1[1] range1[2]]
  L2, R2 = [range2[1] range2[2]]
    
  if L1 <= L2 <= R1 ||
     L1 <= R2 <= R1 ||
     L2 <= L1 <= R2 ||
     L2 <= R1 <= R2 ||
     (L1 <= L2 && R2 <= R1) ||
     (L2 <= L1 && R1 <= R2)
    global overlapping += 1
  end
end

println(overlapping)
