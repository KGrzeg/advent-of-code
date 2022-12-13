mySum = 0
intVal(char::Char) = Int(char) + (char in collect('a':'z') ? -Int('a') + 1 : -Int('A') + 27)

while true
  bag = Set()
  line = readline()
  if length(line) == 0
    break
  end

  for (i, l) in enumerate(line)
    if i <= length(line) / 2
      push!(bag, l)
    elseif l in bag
      global mySum += intVal(l)
      break
    end
  end
end

println(mySum)
