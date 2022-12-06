require 'json'

def data
  {
    "node" => 'Example of a ruby app logging to stdout',
    "time" => Time.now()
  }
end

def err
  begin
    raise "ruby example error"
  rescue RuntimeError  => e
    e
  end
end

def log
  time = rand(0..4)
  # string keyed hash
  p(data)
  # symbol keyed hash
  p(data.transform_keys(&:to_sym))
  # json without escape chars, {"node":"Example" }
  puts(data.to_json)
  # json with escape chars, "{\"node\":\"Example\"}\"
  p(data.to_json)
  # plain text
  p(err)
  sleep time
  log()
end
log()




