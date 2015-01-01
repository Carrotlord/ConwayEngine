def convert(file_name)
  lines = IO.readlines(file_name)
  new_file = ''
  lines.each do |line|
    new_file += '"' + line.chomp + "\",\n"
  end
  IO.write('converted_' + file_name, new_file)
end

convert("stargate.txt")