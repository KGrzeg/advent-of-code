mySum = 0
intVal(char::Char) = Int(char) + (char in collect('a':'z') ? -Int('a') + 1 : -Int('A') + 27)

while true
  line = readline() # elf 1
  if length(line) == 0
    break
  end
  bag = Set(line)
  common = Set()
  
  for l in readline() # elf 2
    if l in bag
      push!(common, l)
    end
  end

  for l in readline() # elf 3
    if l in common
      global mySum += intVal(l)
      break
    end
  end
end

println(mySum)
